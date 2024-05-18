import express from 'express';
import CollectionService from '../services/collection.service';
import authMiddleware from '../middleware/auth.middleware';

const collectionController = express.Router();

collectionController.route("/").get(CollectionService.getCollections)
collectionController.route("/").post(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  CollectionService.createCollection
);
collectionController.route("/:id").get(CollectionService.getCollectionById);
collectionController.route("/slug/:slug").get(CollectionService.getCollectionBySlug)
collectionController.route("/:id").patch(
  authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  CollectionService.updateCollection
);
collectionController.route("/:id").delete(authMiddleware.verifyToken,
  authMiddleware.verifyTokenAndAdminRole,
  CollectionService.deleteCollection
);

export default collectionController;