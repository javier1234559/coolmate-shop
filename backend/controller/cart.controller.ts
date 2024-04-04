import express from 'express';
import { validationDto } from '../middleware/validation.middleware';
import cartService from '../services/cart.service';

const cartServiceController = express.Router();

cartServiceController
  .route("/")
  .get(cartService.getCarts)

export default cartServiceController;