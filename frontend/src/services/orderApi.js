import baseApi from './baseApi';

const orderApi = {
  createMoMoPaymentUrl(momoOrder) {
    const url = `/orders/momo/payment`;
    return baseApi.post(url, momoOrder);
  },
  checkStatusMoMoGateway(orderId) {
    const url = `/orders/momo/check-status`;
    return baseApi.post(url, { orderId: orderId });
  },
  createZaloPayPaymentUrl(zaloPayOrder) {
    const url = `/orders/zalopay/payment`;
    return baseApi.post(url, zaloPayOrder);
  },
  checkStatusZaloPayGateway(orderId) {
    const url = `/orders/zalopay/check-status`;
    return baseApi.post(url, { app_trans_id: orderId });
  },
  createOrder(order) {
    const url = `/orders`;
    return baseApi.post(url, order);
  }
}

export default orderApi;
