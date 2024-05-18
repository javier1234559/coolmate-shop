import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import ColorService from '../services/color.service';

const colorController = express.Router();

colorController.route("/").get(ColorService.getColors);
colorController.route("/:id").get(ColorService.getColorById);
colorController.route("/").post(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  ColorService.createColor
);
colorController.route("/:id").patch(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  ColorService.updateColor
);
colorController.route("/:id").delete(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  ColorService.deleteColor
);

export default colorController;