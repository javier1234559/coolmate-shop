import { Request, Response } from "express";
import { Color, Product, ProductColorSize, Size } from "../entities/product.entity";
import connectDB from "../database/data-source";
import { FindManyOptions, Like } from "typeorm";

class ProductService {

  static productRepository = connectDB.getRepository(Product);
  static productColorSizeRepository = connectDB.getRepository(ProductColorSize);
  static colorRepository = connectDB.getRepository(Color);
  static sizeRepository = connectDB.getRepository(Size);

  static getProducts = async (_req: Request, res: Response) => {
    const page = parseInt(_req.query.page as string) || 1;
    const pageSize = parseInt(_req.query.pageSize as string) || 10;
    const keyword = _req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    let condition: FindManyOptions<Product>;
    if (keyword === undefined) {
      // If keyword is not provided, select all products
      condition = {
        relations: ['category'],
        take: pageSize,
        skip: skip,
      };
    } else {
      // If keyword is provided, filter products based on the keyword
      condition = {
        relations: ['category'],
        where: [
          { name: Like('%' + keyword + '%') },
          { category: { name: Like('%' + keyword + '%') } },
        ],
        take: pageSize,
        skip: skip,
      };
    }
    try {
      const [products, total] = await this.productRepository.findAndCount(condition);
      return res.status(200).json({ products, total });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  };

  static getBestSellerProduct = async (_req: Request, res: Response) => {
    // const condition = {
    //   relations: {
    //     review: true,
    //     order: true
    //   },
    //   order: {
    //     name: "DESC"
    //   },
    //   take: 10,
    // };
    // const bestSellerProduct = this.productRepository.find(condition);
  }

  //getLastProduct

  //getTopCollections


  //create new Product
  // static createProductWithColorSize = async (_req: Request, res: Response) => {

  //   const { name, colorName, sizeName, quantity } = _req.body;
  //   const checkUnderfine = [name, colorName, sizeName, quantity].every((item) => item !== undefined);
  //   if (!checkUnderfine) {
  //     return res.status(400).json({ message: "Invalid input" });
  //   }

  //   // Check if color exists, create if not
  //   let color = await this.colorRepository.findOne({ where: { name: colorName } });
  //   if (!color) {
  //     color = new Color();
  //     color.name = colorName;
  //   }

  //   // Check if size exists, create if not
  //   let size = await this.sizeRepository.findOne({ where: { name: sizeName } });
  //   if (!size) {
  //     size = new Size();
  //     size.name = sizeName;
  //   }

  //   // Create a new ProductColorSize
  //   const productColorSize = new ProductColorSize();
  //   productColorSize.quantity = quantity;
  //   productColorSize.color = color;
  //   productColorSize.size = size;

  //   // Create a new Product
  //   const product = new Product();
  //   product.name = name;
  //   product.colorSizes = [productColorSize];

  //   // Save the entities to the database
  //   await this.productRepository.save(product);

  //   return product;
  // }

}

export default ProductService;