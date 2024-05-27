import { Request, Response } from "express";
import { Color, Product, ProductColorSize, ProductMedia, Size } from "../entities/product.entity";
import connectDB from "../database/data-source";
import { FindManyOptions, Like } from "typeorm";
import { Review } from "../entities/review.entity";
import logger from "../utils/logger";
import { Category } from "../entities/category.entity";
import { User } from "../entities/user.entity";
import { OrderItem } from "../entities/order.entity";
import { printObject } from "../utils/prettyLog";

class ProductService {
  static productRepository = connectDB.getRepository(Product);
  static userRepository = connectDB.getRepository(User);
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
          { brand: Like('%' + keyword + '%') },
        ]
        : undefined,
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

  static createReview = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { rating, comment } = req.body;

    const product = await this.productRepository.findOne({
      where: { slug: slug },
    });

    if (!product) {
      return res.status(404).json({ message: `Product with ID ${slug} not found` });
    }


    const review = new Review();
    review.product = product;
    review.rating = rating;
    review.comment = comment;

    //set user rating 
    const user = await this.userRepository.findOne({ where: { email: req.user.email } });
    if (!user) {
      review.user = user;
    }

    // update product rating
    product.rating = parseFloat(((product.rating * product.numReviews + rating) / (product.numReviews + 1)).toFixed(2));
    product.numReviews = product.numReviews + 1;

    try {
      await this.reviewRepository.save(review);
      await this.productRepository.save(product);
      return res.status(200).json(review);
    } catch (error) {
      console.error('Error creating review', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

  }

  static getReviewsBySlugProduct = async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) {
      return res.status(404).json({ message: `Invalid product slug: ${slug}` });
    }

    const product = await this.productRepository.findOne({
      where: { slug: slug },
      relations: ['reviews']
    });

    if (!product) {
      return res.status(404).json({ message: `Product with slug ${slug} not found` });
    }

    const reviews = await this.reviewRepository.find({
      where: {
        product: {
          id: product.id
        }
      },
      relations: ['user'],
    });

    return res.status(200).json(reviews);
  }

  static getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Invalid product ID: ${id}` });
    }

    const product = await this.productRepository.findOne({
      where: { id: parseInt(id) },
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
    product.seller_id = req.user.id;
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
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.media', 'media')
        .leftJoinAndSelect('product.colorSizes', 'colorSizes')
        .addSelect(subQuery => {
          return subQuery
            .select('SUM(orderItem.quantity)', 'totalQuantity')
            .from(OrderItem, 'orderItem')
            .where('orderItem.product_slug = product.slug');
        }, 'totalQuantity')
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

    const { name, price, brand, description, is_active, category, media, colorSizes } = req.body;
    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Invalid product ID: ${id}` });
    }

    printObject(req.body);

    const product = await this.productRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }

    const checkUndefined = [name, price, brand, description, is_active, category, media, colorSizes]
      .every((item) => item !== undefined);

    if (!checkUndefined) {
      return res.status(400).json({ message: "Invalid input" });
    }

    if (req.user) {
      product.seller_id = req.user.id;
      printObject(req.user);
    }

    product.name = name;
    product.price = price;
    product.brand = brand;
    product.description = description;
    product.is_active = is_active;
    product.slug = name.toLowerCase().replace(/ /g, '-');


    //check exist or create new category
    let categoryExist = await this.productCategoryRepository.findOne({ where: { name: category.name } });
    if (!categoryExist) {
      const newCategory = new Category();
      newCategory.icon = category?.icon;
      newCategory.name = category?.name;
      newCategory.description = category?.description;
      categoryExist = await this.productCategoryRepository.save(newCategory);
    }
    product.category = categoryExist;
    // check exist or create new colorSizes
    product.colorSizes = [];
    for (var item of colorSizes) {
      let colorSize = await this.productColorSizeRepository.findOne({
        where: {
          color: {
            name: item?.color?.name
          }, size: {
            name: item?.size?.name
          }
        }
      });
      if (!colorSize) {
        // Create new colorSize if it doesn't exist
        colorSize = new ProductColorSize();
        colorSize.color = item.color;
        colorSize.size = item.size;
      }
      product.colorSizes.push(colorSize);
    }

    //check exist or create new media
    product.media = [];
    for (var obj of media) {
      let mediaExist = await this.productMediaRepository.findOne({ where: { media_url: obj?.media_url } });
      if (!mediaExist) {
        let newMedia = new ProductMedia();
        newMedia.media_type = obj.media_type;
        newMedia.media_url = obj.media_url;
        mediaExist = newMedia;
      }
      product.media.push(mediaExist);
    }


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