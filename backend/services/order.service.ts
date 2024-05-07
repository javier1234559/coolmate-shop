import { Request, Response } from "express";
import connectDB from "../database/data-source";
import { Order } from "../entities/order.entity";
import { FindManyOptions, Like } from "typeorm";
import { Product } from "../entities/product.entity";
import { calcPrices } from "../utils/calcPrice";

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
    order.taxPrice = taxPrice;
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

}

export default OrderService;