import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import config from '../config/config';

cloudinary.v2.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const randomNumber = Math.floor(Math.random() * 100);

    const randomId = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}_${randomNumber}`;

    return {
      folder: 'coolmate-shop',
      format: 'jpeg',
      public_id: randomId,
    };
  },
});

const parser = multer({ storage: storage });

export default class UploadService {

  static storeImage(req: Request, res: Response) {
    parser.single('image')(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
      }
      // You can access `req.file` here
      res.send(req.file);
    });
  }

  // static async storeImageSubmited(avatar_img: any) {
  //   try {
  //     let filePath = avatar_img.file.originFileObj.path;

  //     // If path is not available, create a temporary file
  //     if (!filePath && avatar_img.file.originFileObj.buffer) {
  //       filePath = path.join(__dirname, avatar_img.file.uid);
  //       fs.writeFileSync(filePath, avatar_img.file.originFileObj.buffer);
  //     }

  //     if (!filePath) {
  //       throw new Error('File path or buffer is not available');
  //     }

  //     const result = await cloudinary.v2.uploader.upload(filePath);

  //     // If a temporary file was created, delete it
  //     if (avatar_img.file.originFileObj.buffer) {
  //       fs.unlinkSync(filePath);
  //     }

  //     return result.secure_url;
  //   } catch (error) {
  //     console.error(error);
  //   }

  // }
}