import express from 'express';
import { validationDto } from '../middleware/validation.middleware';
import CollectionService from '../services/collection.service';

const collectionController = express.Router();

collectionController
  .route("/")
  .get(CollectionService.getCollections)

export default collectionController;