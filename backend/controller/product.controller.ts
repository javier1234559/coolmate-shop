// import express from "express";
// import ProductServices from "../Servicess/productServices.js";
// import { protect, admin } from "../middleware/authMiddleware.js";
// import checkObjectId from "../middleware/checkObjectId.js";

// const productController = express.Router();
// const ProductService = new ProductService();

// productController
//   .route("/")
//   .get(productController.getProducts)
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

// export default productController;