import axios from "axios";
import CryptoJS from "crypto-js";
import { Request, Response } from "express";
import moment from "moment";
import { FindManyOptions } from "typeorm";
import config from "../config/config";
import connectDB from "../database/data-source";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { calcPrices } from "../utils/calcPrice";
import qs from "qs";
// import { sortObject } from "../utils/sortObject";
import crypto from "crypto";


class OrderService {
  static orderRepository = connectDB.getRepository(Order);
  static productRepository = connectDB.getRepository(Product);

  static getMyOrders = async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
      const orders = await this.orderRepository.find({
        where: {
          user: {
            id: userId
          }
        }
      });
      return res.status(200).json(orders);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getOrders = async (req: Request, res: Response) => {
    const page = parseInt(req.query._start as string) || 1;
    const pageSize = parseInt(req.query._end as string) || 10;
    const keyword = req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<Order> = {
      take: pageSize,
      skip: skip
    };

    try {
      const [Orders, total] = await this.orderRepository.findAndCount(condition);
      return res.status(200).json(Orders);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  };

  static getOrderById = async (req: Request, res: Response) => {
    const orderId = req.params.id;

    if (!orderId || isNaN(parseInt(orderId))) return res.status(400).json({ message: 'Order ID is not valid' });

    try {
      const order = await this.orderRepository.findOne(
        {
          where: {
            id: parseInt(orderId)
          }
        }
      );
      if (order) {
        return res.status(200).json(order);
      } else {
        return res.status(404).json({ message: 'Order not found' });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static addOrderItems = async (req: Request, res: Response) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // map over the order items in database to use the price in datase
    const listOfOrderItemsInDB = orderItems.map(async (item: any) => {
      const productInDB = await this.productRepository.findOne({ where: { id: parseInt(item.product.id) } });
      if (!productInDB) return res.status(404).json({ message: `Product with id ${item.product.id} not found` });
      return {
        ...item,
        price: productInDB!.price,
        quantity: item.quantity
      }
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(listOfOrderItemsInDB);

    const order = new Order();
    order.items = listOfOrderItemsInDB;
    order.user = req.user;
    order.shippingAddress = shippingAddress;
    order.paymentMethod = paymentMethod;
    order.totalPrice = itemsPrice;
    order.shippingPrice = shippingPrice;
    order.totalPrice = totalPrice;

    try {
      const createdOrder = await this.orderRepository.save(order);
      return res.status(201).json(createdOrder);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  }

  static updateOrderToPaid = async (req: Request, res: Response) => {
    const orderId = req.params.id;
    // const { id, status, update_time, payer  } = req.body;

    // if (!orderId || isNaN(parseInt(orderId))) return res.status(400).json({ message: 'Order ID is not valid' });

    // const order = await this.orderRepository.findOne({ where: { id: parseInt(orderId) } });
    // if (!order) return res.status(404).json({ message: 'Order not found' });

    // order.isPaid = true;
    // order.paidAt = new Date();
    // order.paymentResult = {
    //   id,
    //   status,
    //   modified_at: new Date(),

    // };

  }

  static updateOrderToDelivered = async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const { id, status, update_time, payer } = req.body;

    if (!orderId || isNaN(parseInt(orderId))) return res.status(400).json({ message: 'Order ID is not valid' });

    const order = await this.orderRepository.findOne({ where: { id: parseInt(orderId) } });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.isDelivered = true;
    order.deliveredAt = new Date();

    try {
      const updatedOrder = await this.orderRepository.save(order);
      return res.status(200).json(updatedOrder);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // static generateQRCode = async (req: Request, res: Response) => {
  //   const vietQR = new VietQR();
  //   vietQR
  //     .setBeneficiaryOrganization("970418", "3143923459")
  //     .setTransactionAmount("50000")
  //     .setAdditionalDataFieldTemplate("test");

  //   const qrData = vietQR.build();

  //   try {
  //     const qrImage = await QRCode.toDataURL(qrData);
  //     return res.status(200).json({ message: "QR code generated", qrImage });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({ message: "Error generating QR code" });
  //   }
  // }

  // static createPaymentUrl = async (req: Request, res: Response) => {
  //   let ipAddr = req.headers['x-forwarded-for'] ||
  //     req.connection.remoteAddress ||
  //     req.socket.remoteAddress ||
  //     req.connection.socket.remoteAddress;

  //   console.log('ipAddr: ', ipAddr);
  //   // let dateFormat = require('dateformat');


  //   let tmnCode = config.vnpay.vnp_TmnCode;
  //   let secretKey = config.vnpay.vnp_HashSecret;
  //   let vnpUrl = config.vnpay.vnpUrl;
  //   let returnUrl = config.vnpay.returnUrl;

  //   if (!tmnCode || !secretKey || !vnpUrl || !returnUrl) {
  //     throw new Error('VNPay configuration values are missing');
  //   }


  //   let createDate = req.body.createDate;
  //   let orderId = req.body.orderId;
  //   let amount = req.body.amount;
  //   let bankCode = req.body.bankCode;

  //   let orderInfo = req.body.orderDescription;
  //   let orderType = req.body.orderType;
  //   let locale = req.body.language;
  //   if (locale === null || locale === '') {
  //     locale = 'vn';
  //   }
  //   let currCode = 'VND';
  //   let vnp_Params: VnpParams = {
  //     vnp_Version: '2.1.0',
  //     vnp_Command: 'pay',
  //     vnp_TmnCode: tmnCode,
  //     vnp_Locale: locale,
  //     vnp_CurrCode: currCode,
  //     vnp_TxnRef: orderId,
  //     vnp_OrderInfo: orderInfo,
  //     vnp_OrderType: orderType,
  //     vnp_Amount: amount * 100,
  //     vnp_ReturnUrl: returnUrl,
  //     vnp_IpAddr: '172.0.0.1',
  //     vnp_CreateDate: createDate
  //   };

  //   if (bankCode !== null && bankCode !== '') {
  //     vnp_Params['vnp_BankCode'] = bankCode;
  //   }

  //   console.log(vnp_Params);
  //   vnp_Params = sortObject(vnp_Params);

  //   console.log(vnp_Params);
  //   let querystring = require('qs');
  //   let signData = querystring.stringify(vnp_Params, { encode: false });
  //   let crypto = require("crypto");
  //   let hmac = crypto.createHmac("sha512", secretKey);
  //   let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
  //   vnp_Params['vnp_SecureHash'] = signed;
  //   vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

  //   console.log(vnpUrl)
  //   res.status(200).json({ redirectUrl: vnpUrl });
  // }

  static createZaloPaymentUrl = async (req: Request, res: Response) => {

    // Payload from client
    let amount = Number.parseInt(req.body.amount);
    console.log('amount: ', amount);

    const embed_data = {
      redirecturl: config.zalopay.returnUrl,
    };

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.zalopay.appid,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: "user123",
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: amount,
      //khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
      //Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
      callback_url: `${config.ngrok_URL}/api/orders/zalo/callback`,
      description: `Coolmate - Payment for the order #${transID}`,
      bank_code: '',
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = config.zalopay.appid + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.zalopay.key1).toString();

    try {
      const result = await axios.post(config.zalopay.endpoint, null, { params: order });
      console.log(result.data);
      return res.status(200).json(result.data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static createZaloPayCallBack = async (req: Request, res: Response) => {
    type ZaloCallbackResult = {
      return_code: number;
      return_message: string;
    }

    let result: ZaloCallbackResult = {
      return_code: 1,
      return_message: 'success',
    };
    console.log(req.body);

    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;

      let mac = CryptoJS.HmacSHA256(dataStr, config.zalopay.key2).toString();
      console.log('mac =', mac);

      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = 'mac not equal';
      } else {
        // thanh toán thành công
        let dataJson = JSON.parse(dataStr, config.zalopay.key2 as any);
        console.log(
          "update order's status = success where app_trans_id =",
          dataJson['app_trans_id'],
        );
        // merchant cập nhật trạng thái cho đơn hàng ở đây

        result.return_code = 1;
        result.return_message = 'success';
      }
    } catch (ex: any) {
      console.log('lỗi:::' + ex.message);
      result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.return_message = ex.message;
    }

    // thông báo kết quả cho ZaloPay server
    res.json(result);
  }

  static createZaloPayCheckStatus = async (req: Request, res: Response) => {
    const { app_trans_id } = req.body;

    let postData = {
      app_id: config.zalopay.appid,
      app_trans_id, // Input your app_trans_id
    };

    let data = postData.app_id + '|' + postData.app_trans_id + '|' + config.zalopay.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.zalopay.key1).toString();

    let postConfig = {
      method: 'post',
      url: 'https://sb-openapi.zalopay.vn/v2/query',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(postData),
    };

    try {
      const result = await axios(postConfig);
      console.log(result.data);
      return res.status(200).json(result.data);
      /**
       * kết quả mẫu
        {
          "return_code": 1, // 1 : Thành công, 2 : Thất bại, 3 : Đơn hàng chưa thanh toán hoặc giao dịch đang xử lý
          "return_message": "",
          "sub_return_code": 1,
          "sub_return_message": "",
          "is_processing": false,
          "amount": 50000,
          "zp_trans_id": 240331000000175,
          "server_time": 1711857138483,
          "discount_amount": 0
        }
      */
    } catch (error: any) {
      console.log('Error:', error);
      return res.status(500).json({ message: error.message });
    }
  }

  static createMomoPaymentUrl = async (req: Request, res: Response) => {

    // Payload from client
    let amount = Number.parseInt(req.body.amount);
    console.log('amount: ', amount);  
    
    //Momo configuration
    let accessKey = config.momo.accessKey;
    let secretKey = config.momo.secretKey;
    let partnerCode = config.momo.partnerCode;
    let redirectUrl = config.momo.redirectUrl;
    let ipnUrl = `${config.ngrok_URL}/api/orders/momo/callback`;
    let orderId = partnerCode + new Date().getTime();
    let orderInfo = `Coolmate - Payment for the order ${orderId} with MoMo`;
    let requestId = orderId;
    let requestType = 'payWithMethod';
    let extraData = '';
    let orderGroupId = '';
    let autoCapture = true;
    let lang = 'vi';


    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    let rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType;

    //signature
    let signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });

    // options for axios
    const options = {
      method: 'POST',
      url: 'https://test-payment.momo.vn/v2/gateway/api/create',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
      data: requestBody,
    };

    // Send the request and handle the response
    let result;
    try {
      result = await axios(options);
      return res.status(200).json(result.data);
    } catch (error: any) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }

  }

  static createMomoPayCallBack = async (req: Request, res: Response) => {
    /**
      resultCode = 0: giao dịch thành công.
      resultCode = 9000: giao dịch được cấp quyền (authorization) thành công .
      resultCode <> 0: giao dịch thất bại.
     */
    console.log('callback: ');
    console.log(req.body);
    /**
     * Dựa vào kết quả này để update trạng thái đơn hàng
     * Kết quả log:
     * {
          partnerCode: 'MOMO',
          orderId: 'MOMO1712108682648',
          requestId: 'MOMO1712108682648',
          amount: 10000,
          orderInfo: 'pay with MoMo',
          orderType: 'momo_wallet',
          transId: 4014083433,
          resultCode: 0,
          message: 'Thành công.',
          payType: 'qr',
          responseTime: 1712108811069,
          extraData: '',
          signature: '10398fbe70cd3052f443da99f7c4befbf49ab0d0c6cd7dc14efffd6e09a526c0'
        }
     */

    return res.status(204).json(req.body);
  }

  static createMomoPayCheckStatus = async (req: Request, res: Response) => {
    const { orderId } = req.body;

    // const signature = accessKey=$accessKey&orderId=$orderId&partnerCode=$partnerCode&requestId=$requestId
    let partnerCode = 'MOMO';
    let accessKey = config.momo.accessKey;
    let secretKey = config.momo.secretKey;
    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`;

    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      requestId: orderId,
      orderId: orderId,
      signature: signature,
      lang: 'vi',
    });

    // options for axios
    const options = {
      method: 'POST',
      url: 'https://test-payment.momo.vn/v2/gateway/api/query',
      headers: {
        'Content-Type': 'application/json',
      },
      data: requestBody,
    };

    const result = await axios(options);

    return res.status(200).json(result.data);
  }

}



export default OrderService;