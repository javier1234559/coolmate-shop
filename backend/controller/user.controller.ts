import express from 'express';
import { validationDto } from '../middleware/validation.middleware';
import userService from '../services/user.service';

const userController = express.Router();

userController
  .route("/")
  .get(userService.getUsers)

export default userController;