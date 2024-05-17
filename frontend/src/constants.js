export const API_URL = "http://localhost:8080/api";

export const PRODUCT_LIST_HEADING = {
  LATEST: 'Sản phẩm mới nhất',
  BEST_SELLER: 'Sản phẩm bán chạy',
  TOP_COLLECTION: 'top-collection',
}

export const PAYMENT_METHODS = {
  COD: {
    type: 'COD',
    name: 'COD - Thanh toán khi nhận hàng',
  },
  ZALOPAY: {
    type: 'ZALOPAY',
    name: 'ZaloPay - Thanh toán qua ZaloPay',
  },
  MOMO: {
    type: 'MOMO',
    name: 'MoMo - Thanh toán qua MoMo',
  },
}


export const ORDER_STATUS = {
  PENDING: 'Chờ duyệt',
  APPROVED: 'Đã Duyệt',
  REJECTED: 'Đã bị Từ chối',
  DELIVERED: 'Đã giao',
  IN_TRANSIT: 'Đang vận chuyển',
}

export const PAYMENT_STATUS = {
  UNPAID: 'Chưa Thanh Toán',
  PAID: 'Đã Thanh Toán',
  PAYMENT_FAILED: 'Thanh Toán thất bại',
}