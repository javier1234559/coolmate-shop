import baseApi from './baseApi';

const orderApi = {
  createMoMoPaymentUrl(momoOrder) {
    const url = `/orders/momo/payment`;
    return baseApi.post(url, momoOrder);
  },
  createZaloPayPaymentUrl(zaloPayOrder) {
    const url = `/orders/zalopay/payment`;
    return baseApi.post(url, zaloPayOrder);
  },
  createCodOrder(order) {
    const url = `/orders`;
    return baseApi.post(url, order);
  }
}

export default orderApi;
