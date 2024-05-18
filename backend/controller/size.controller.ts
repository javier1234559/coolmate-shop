import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import SizeService from '../services/size.service';

const sizeController = express.Router();

sizeController.route("/").get(SizeService.getSizes);
sizeController.route("/:id").get(SizeService.getSizeById);
sizeController.route("/").post(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  SizeService.createSize
);
sizeController.route("/:id").patch(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  SizeService.updateSize
);
sizeController.route("/:id").delete(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  SizeService.deleteSize
);

export default sizeController;