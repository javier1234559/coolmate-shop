import express from 'express';
import UploadService from '../services/upload.service';

const uploadController = express.Router();


uploadController.route("/").post(UploadService.storeImage);



export default uploadController;