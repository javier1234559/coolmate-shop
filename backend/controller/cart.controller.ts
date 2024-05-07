import express from 'express';
import cartService from '../services/cart.service';
import authMiddleware from '../middleware/auth.middleware';


const cartServiceController = express.Router();

cartServiceController.route("/my-cart").get(authMiddleware.verifyToken, cartService.getMyCart);
cartServiceController
  .route("/")
  .get(
    authMiddleware.verifyToken,
    authMiddleware.verifyTokenAndAdminRole,
    cartService.getCarts
  )
  .post(
    authMiddleware.verifyToken,
    cartService.createCart
  );
cartServiceController.route("/:id").get(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  cartService.getCartById
);
cartServiceController.route("/:id").put(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  cartService.updateCart
);

export default cartServiceController;