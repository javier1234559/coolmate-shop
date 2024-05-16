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
orderServiceController.route("/mine").get(authMiddleware.verifyToken, orderService.getMyOrders)
orderServiceController.route("/:id").get(authMiddleware.verifyToken, orderService.getOrderById)
orderServiceController.route("/:id/pay").put(authMiddleware.verifyToken, orderService.updateOrderToPaid)
orderServiceController.route("/:id/deliver").put(authMiddleware.verifyToken, orderService.updateOrderToDelivered)
orderServiceController
  .route("/")
  .post(authMiddleware.verifyToken, orderService.addOrderItems)
  .get(authMiddleware.verifyToken, authMiddleware.verifyTokenAndAdminRole, orderService.getOrders)


export default orderServiceController;