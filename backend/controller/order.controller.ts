import express from 'express';
import { validationDto } from '../middleware/validation.middleware';
import orderService from '../services/order.service';

const orderServiceController = express.Router();

orderServiceController
  .route("/")
  .get(orderService.getOrders)

export default orderServiceController;