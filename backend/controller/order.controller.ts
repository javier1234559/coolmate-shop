import express from 'express';
import orderService from '../services/order.service';
import authMiddleware from '../middleware/auth.middleware';

const orderServiceController = express.Router();


orderServiceController.route("/mine").get(authMiddleware.verifyToken, orderService.getMyOrders)
orderServiceController.route("/:id").get(authMiddleware.verifyToken, orderService.getOrderById)
orderServiceController.route("/:id/pay").put(authMiddleware.verifyToken, orderService.updateOrderToPaid)
orderServiceController.route("/:id/deliver").put(authMiddleware.verifyToken, orderService.updateOrderToDelivered)
orderServiceController
  .route("/")
  .post(authMiddleware.verifyToken, orderService.addOrderItems)
  .get(authMiddleware.verifyToken, authMiddleware.verifyTokenAndAdminRole, orderService.getOrders)


export default orderServiceController;