import express from 'express';
import { validationDto } from '../middleware/validation.middleware';
import userService from '../services/user.service';

const userServiceController = express.Router();

userServiceController
  .route("/")
  .get(userService.getUsers)

export default userServiceController;