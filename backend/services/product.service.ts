import { Request, Response } from "express";
import { Color, Product, ProductColorSize, Size } from "../entities/product.entity";
import connectDB from "../database/data-source";
import { FindManyOptions, Like } from "typeorm";
import { Review } from "../entities/review.entity";

class ProductService {
  static productRepository = connectDB.getRepository(Product);
  static productColorSizeRepository = connectDB.getRepository(ProductColorSize);
  static colorRepository = connectDB.getRepository(Color);
  static sizeRepository = connectDB.getRepository(Size);
  static reviewRepository = connectDB.getRepository(Review);


  static getProducts = async (_req: Request, res: Response) => {
    console.log(_req.query)
    const page = parseInt(_req.query._start as string) || 1;
    const pageSize = parseInt(_req.query._end as string) || 10;
    const keyword = _req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<Product> = {
      relations: ['category'],
      take: pageSize,
      skip: skip,
      where: keyword
        ? [
          { name: Like('%' + keyword + '%') },
          { category: { name: Like('%' + keyword + '%') } },
        ]
        : undefined,
      // cache: true,
    };

    try {
      const [products, total] = await this.productRepository.findAndCount(condition);
      res.status(200).json(products);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  };

  static getProductBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;

    if (!slug) {
      return res.status(404).json({ message: `Invalid product slug: ${slug}` });
    }

    const product = await this.productRepository.findOne({
      where: { slug: slug },
      cache: true,
    });

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: `Product with slug ${slug} not found` });
    }
  }

  static getReviewsBySlugProduct = async (req: Request, res: Response) => {
    const { slug } = req.params;
    console.log(slug);
    if (!slug) {
      return res.status(404).json({ message: `Invalid product slug: ${slug}` });
    }

    const product = await this.productRepository.findOne({
      where: { slug: slug },
      cache: true,
    });

    if (!product) {
      return res.status(404).json({ message: `Product with slug ${slug} not found` });
    }

    const reviews = await this.reviewRepository.find({
      where: { product: product },
      cache: true,
    });

    return res.status(200).json(reviews);
  }


  static getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log(id);

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Invalid product ID: ${id}` });
    }

    console.log(parseInt(id));
    const product = await this.productRepository.findOne({
      where: { id: parseInt(id) },
      cache: true,
    });
    
    console.log("Logging product: ", product);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
  }

  static createProduct = async (_req: Request, res: Response) => {
    const { name, price, description, category, media } = _req.body;
    const checkUnderfine = [name, price, description, category, media]
      .every((item) => item !== undefined);
    if (!checkUnderfine) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const product = new Product();
    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.media = media;

    try {
      await this.productRepository.save(product);
      return res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static getBestSellerProduct = async (_req: Request, res: Response) => {
    try {
      const bestSellers = await this.productRepository
        .createQueryBuilder('product')
        .leftJoin('product.orderItems', 'orderItem')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.media', 'media')
        .leftJoinAndSelect('product.colorSizes', 'colorSizes')
        .leftJoinAndSelect('colorSizes.color', 'color')
        .leftJoinAndSelect('colorSizes.size', 'size')
        .addSelect([
          'SUM(orderItem.quantity) AS totalQuantity'
        ])
        .groupBy('product.id, category.id, media.id, colorSizes.id, color.id, size.id')
        .orderBy('totalQuantity', 'DESC')
        .getMany();


      return res.status(200).json(bestSellers);
    } catch (error) {
      console.error('Error fetching best-selling products', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static getLastestProduct = async (_req: Request, res: Response) => {
    try {
      const limit = parseInt(_req.query.limit as string) || 10;

      const lastProducts = await this.productRepository.find({
        order: {
          created_at: 'DESC'
        },
        take: limit,
      });

      return res.status(200).json({
        message: 'Last products',
        data: lastProducts
      });
    } catch (error) {
      console.error('Error fetching last products', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, description, category, media } = req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Invalid product ID: ${id}` });
    }

    const product = await this.productRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.media = media || product.media;

    try {
      await this.productRepository.save(product);
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error updating product', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Invalid product ID: ${id}` });
    }

    const product = await this.productRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }

    try {
      await this.productRepository.remove(product);
      return res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      console.error('Error deleting product', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

}

export default ProductService;