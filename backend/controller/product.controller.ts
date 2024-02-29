import express from 'express';
import ProductService from '../services/product.service';
// import { protect, admin } from "../middleware/authMiddleware.js";
// import checkObjectId from "../middleware/checkObjectId.js";

const productController = express.Router();

productController
  .route("/")
  .get(ProductService.getProducts)
//   .post(protect, admin, ProductService.createProduct);
// productController
//   .route("/:id/reviews")
//   .post(protect, checkObjectId, ProductService.createProductReview);
// productController.get("/top", ProductService.getTopProducts);
// productController
//   .route("/:id")
//   .get(checkObjectId, ProductService.getProductById)
//   .put(protect, admin, checkObjectId, ProductService.updateProduct)
//   .delete(protect, admin, checkObjectId, ProductService.deleteProduct);
// productController
//   .route("/:id/recommend")
//   .get(checkObjectId, ProductService.getListRecommendProduct);

export default productController;