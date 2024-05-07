import { Request, Response } from "express";
import { Color, Product, ProductColorSize, ProductMedia, Size } from "../entities/product.entity";
import connectDB from "../database/data-source";
import { FindManyOptions, Like } from "typeorm";
import { Review } from "../entities/review.entity";
import logger from "../utils/logger";
import { Category } from "../entities/category.entity";

class ProductService {
  static productRepository = connectDB.getRepository(Product);
  static productColorSizeRepository = connectDB.getRepository(ProductColorSize);
  static productMediaRepository = connectDB.getRepository(ProductMedia);
  static productCategoryRepository = connectDB.getRepository(Category);
  static colorRepository = connectDB.getRepository(Color);
  static sizeRepository = connectDB.getRepository(Size);
  static reviewRepository = connectDB.getRepository(Review);


  static getProducts = async (req: Request, res: Response) => {
    console.log(req.query)
    const page = parseInt(req.query._start as string) || 1;
    const pageSize = parseInt(req.query._end as string) || 10;
    const keyword = req.query.keyword as string;
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

    logger.info(id);

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Invalid product ID: ${id}` });
    }

    console.log(parseInt(id));
    const product = await this.productRepository.findOne({
      where: { id: parseInt(id) },
      cache: true,
      relations: ['category'],
    });

    logger.info("Logging product: ", product);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
  }

  static createProduct = async (req: Request, res: Response) => {
    const { name, price, brand, description, is_active, category, media, colorSizes } = req.body;

    const checkUndefined = [name, price, description, category, media, colorSizes]
      .every((item) => item !== undefined);

    if (!checkUndefined) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const product = new Product();
    product.name = name;
    product.price = price;
    product.brand = brand;
    product.description = description;
    product.is_active = is_active;
    product.slug = name.toLowerCase().replace(/ /g, '-');

    //check exist or create new category
    const categoryExist = await this.productCategoryRepository.findOne({ where: { name: category.name } });
    if (categoryExist) {
      product.category = categoryExist;
    } else {
      const newCategory = new Category();
      newCategory.icon = category.icon;
      newCategory.name = category.name;
      newCategory.description = category.description;
      product.category = newCategory;
    }

    // check exist or create new colorSizes
    product.colorSizes = [];
    for (var i = 0; i < colorSizes.length; i++) {
      const colorSizesExist = await this.productColorSizeRepository.findOne({ where: { color: colorSizes.color, size: colorSizes.size } });
      if (colorSizesExist) {
        product.colorSizes.push(colorSizesExist);
      } else {
        let newColorSize = new ProductColorSize();
        newColorSize.color = colorSizes[i].color;
        newColorSize.size = colorSizes[i].size;
        newColorSize.quantity = colorSizes[i].quantity;
        product.colorSizes.push(newColorSize);
      }
    }

    //check exist or create new media
    product.media = [];
    for (var i = 0; i < media.length; i++) {
      const mediaExist = await this.productMediaRepository.findOne({ where: { media_url: media[i].media_url } });
      if (mediaExist) {
        product.media.push(mediaExist);
      } else {
        let newMedia = new ProductMedia();
        newMedia.media_type = media[i].media_type;
        newMedia.media_url = media[i].media_url;
        product.media.push(newMedia);
      }
    }

    logger.info(product);
    try {
      await this.productRepository.save(product);
      const createdProduct = await this.productRepository.findOne({
        where: { name: product.name },
        relations: ['category', 'media', 'colorSizes'],
      });
      return res.status(200).json(createdProduct);
    } catch (error) {
      logger.error('Error create product', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static getBestSellerProduct = async (req: Request, res: Response) => {
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

  static getLastestProduct = async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;

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
    const { name, seller_id, price, brand, description, is_active, category, media, colorSizes } = req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Invalid product ID: ${id}` });
    }

    const product = await this.productRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }

    const checkUndefined = [name, seller_id, price, brand, description, is_active, category, media, colorSizes]
      .every((item) => item !== undefined);

    if (!checkUndefined) {
      return res.status(400).json({ message: "Invalid input" });
    }

    product.seller_id = seller_id;
    product.name = name;
    product.price = price;
    product.brand = brand;
    product.description = description;
    product.is_active = is_active;
    product.slug = name.toLowerCase().replace(/ /g, '-');
    product.category = category;
    product.colorSizes = colorSizes
    product.media = media

    logger.info(product);

    try {
      await this.productRepository.save(product);
      const createProduct = await this.productRepository.findOne({
        where: { id: parseInt(id) },
        relations: ['category', 'media', 'colorSizes'],
      });
      return res.status(200).json(createProduct);
    } catch (error: any) {
      console.error('Error updating product', error.message);
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