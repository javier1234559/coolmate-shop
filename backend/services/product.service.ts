import { Request, Response } from "express";
import { Product } from "../entities/product.entity";
import connectDB from "../database/data-source";

class ProductService {
  // @desc    Fetch all products
  // @route   GET /api/products
  // @access  Public
  static getProducts = async (_req: Request, res: Response) => {
    try {
      const productRepository = connectDB.getRepository(Product);
      const products = await productRepository.find();
      return res.json(products);
    } catch (error: any) {
      return res.status(500)
        .json({
          error: error?.message || 'Something went wrong'
        });
    }
  };


}

export default ProductService;