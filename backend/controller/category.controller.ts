import express from 'express';
import { validationDto } from '../middleware/validation.middleware';
import CategoryService from '../services/categories.service';

const categoryServiceController = express.Router();

categoryServiceController
  .route("/")
  .get(CategoryService.getCategorys)

export default categoryServiceController;