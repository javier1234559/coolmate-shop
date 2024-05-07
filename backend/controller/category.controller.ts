import express from 'express';
import CategoryService from '../services/categories.service';
import authMiddleware from '../middleware/auth.middleware';

const categoryServiceController = express.Router();

categoryServiceController.route("/").get(CategoryService.getCategorys)
categoryServiceController.route("/").post(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  CategoryService.createCategory)
categoryServiceController.route("/:id").put(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  CategoryService.updateCategory)
categoryServiceController.route("/:id").delete(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  CategoryService.deleteCategory)


export default categoryServiceController;