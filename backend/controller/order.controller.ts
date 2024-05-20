import express from 'express';
import orderService from '../services/order.service';
import authMiddleware from '../middleware/auth.middleware';

const orderServiceController = express.Router();

orderServiceController.route("/zalopay/payment").post(orderService.createZaloPaymentUrl)
orderServiceController.route("/zalopay/callback").post(orderService.createZaloPayCallBack)
orderServiceController.route("/zalopay/check-status").post(orderService.createZaloPayCheckStatus)

orderServiceController.route("/momo/payment").post(orderService.createMomoPaymentUrl)
orderServiceController.route("/momo/callback").post(orderService.createMomoPayCallBack)
orderServiceController.route("/momo/check-status").post(orderService.createMomoPayCheckStatus)


// orderServiceController.route("/qr").get(orderService.generateQRCode)
// orderServiceController.route("/create_payment_url").post(orderService.createPaymentUrl)

orderServiceController.route("/check-discount").get(authMiddleware.verifyToken, orderService.checkValidDiscountCode)
orderServiceController.route("/mine").get(authMiddleware.verifyToken, orderService.getMyOrders)
orderServiceController.route("/:id").get(authMiddleware.verifyToken, orderService.getOrderById)
orderServiceController.route("/:id").patch(authMiddleware.verifyToken, authMiddleware.verifyTokenAndAdminRole, orderService.updateOrderStatus)
// orderServiceController.route("/:id/deliver").put(authMiddleware.verifyToken, orderService.updateOrderToDelivered)
orderServiceController
  .route("/")
  .post(orderService.addOrderItems)
  .get(authMiddleware.verifyToken, authMiddleware.verifyTokenAndAdminRole, orderService.getOrders)


export default orderServiceController;