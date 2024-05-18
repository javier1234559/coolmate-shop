import express from 'express';
import userService from '../services/user.service';
import authMiddleware from "../middleware/auth.middleware";

const userController = express.Router();

userController
  .route("/")
  .get(
    authMiddleware.verifyToken,
    authMiddleware.verifyTokenAndAdminRole,
    userService.getUsers)
  .post(
    authMiddleware.verifyToken,
    authMiddleware.verifyTokenAndAdminRole,
    userService.createUser);
userController.route("/:id")
  .get(
    authMiddleware.verifyToken,
    authMiddleware.verifyTokenAndAdminRole,
    userService.getUserById
  )
  .patch(
    authMiddleware.verifyToken,
    authMiddleware.verifyTokenAndAdminRole,
    userService.updateUser)
  .delete(
    authMiddleware.verifyToken,
    authMiddleware.verifyTokenAndAdminRole,
    userService.deleteUser);

export default userController;