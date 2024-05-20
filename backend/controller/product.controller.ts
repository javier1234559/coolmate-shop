import express from 'express';
import ProductService from '../services/product.service';
import authMiddleware from "../middleware/auth.middleware";

const productController = express.Router();

productController.route("/").get(ProductService.getProducts)
  .post(
    authMiddleware.verifyToken,
    authMiddleware.verifyTokenAndAdminRole,
    ProductService.createProduct
  );
productController.route("/:id")
  .patch(
    authMiddleware.verifyToken,
    authMiddleware.verifyTokenAndAdminRole,
    ProductService.updateProduct
  )
  .delete(
    authMiddleware.verifyToken,
    authMiddleware.verifyTokenAndAdminRole,
    ProductService.deleteProduct
  );
productController.route("/best-seller").get(ProductService.getBestSellerProduct);
productController.route("/latest").get(ProductService.getLastestProduct);
productController.route("/:id").get(ProductService.getProductById);
productController.route("/slug/:slug").get(ProductService.getProductBySlug);
productController.route("/:slug/reviews").get(ProductService.getReviewsBySlugProduct);
productController.route("/:slug/reviews").post(authMiddleware.verifyToken, ProductService.createReview);


export default productController;