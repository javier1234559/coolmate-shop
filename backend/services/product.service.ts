import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import { Request, Response } from "express";
import Recommend from "../utils/recommend.js";
import mongoose from "mongoose";

class ProductService {
  // @desc    Fetch all products
  // @route   GET /api/products
  // @access  Public
  getProducts = asyncHandler(async (req: Request, res: Response) => {
    // 1. Determine the number of products per page (e.g., 20 products).
    // 2. Get the page number; the default is 1.
    // 3. Search for products using a keyword.
    //    The keyword can be in regular expression format, and the "i" option makes it case-insensitive.
    // 4. Count the total number of products.
    // 5. Retrieve products based on the provided keyword with a result limit and skip (pageSize * numberOfPage)
    const pageSize: number = Number(process.env.PAGINATION_LIMIT) || 8;
    const page: number = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i", //not case sensitive
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  });

  // @desc    Fetch single product
  // @route   GET /api/products/:id
  // @access  Public
  getProductById = asyncHandler(async (req: Request, res: Response) => {
    // 1. Check valid objectID , this case it will handle in checkObjectId middleware
    // 2. Find product by id

    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });

  // @desc    Create a product
  // @route   POST /api/products
  // @access  Private/Admin
  createProduct = asyncHandler(async (req: Request, res: Response) => {
    // 1. Check user must be authenticated at protect middleware
    // 2. Check user is admin at admin middleware
    // 3. Get data from req.body and create new Product object
    // 4. Save new product

    const {
      name,
      user,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body;
    console.log(req.body);
    const product = new Product({
      name: name,
      price: price,
      user: user._id,
      image: image,
      brand: brand,
      category: category,
      countInStock: countInStock,
      numReviews: 0,
      description: description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  });

  // @desc    Update a product
  // @route   PUT /api/products/:id
  // @access  Private/Admin
  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    // 1. Check user must be authenticated at protect middleware
    // 2. Check user is admin at admin middleware
    // 3. get data from req.body
    // 4. find product by id
    // 5. if exist update else throw new Error("Product not Found")

    const { name, price, description, image, brand, category, countInStock } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });

  // @desc    Delete a product
  // @route   DELETE /api/products/:id
  // @access  Private/Admin
  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    // 1. Check user must be authenticated at protect middleware
    // 2. Check user is admin at admin middleware

    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });

  // @desc    Create new review
  // @route   POST /api/products/:id/reviews
  // @access  Private
  createProductReview = asyncHandler(async (req: Request, res: Response) => {
    // 1. Check user must be authenticated at protect middleware
    // 2. Get rating , comment ,user , id from request
    // 3. Find product by

    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user!._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user!.name,
        rating: Number(rating),
        comment,
        user: req.user!._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });

  // @desc    Get top rated products
  // @route   GET /api/products/top
  // @access  Public
  getTopProducts = asyncHandler(async (req: Request, res: Response) => {
    //Find top 3 product and sort with rating descending order

    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.json(products);
  });

  // @desc    Get list of product recommended
  // @route   GET /api/products/:id/recommend
  // @access  Public
  getListRecommendProduct = asyncHandler(
    async (req: Request, res: Response) => {
      const targetItemId = req.params.id;

      const products = await Product.find();
      const recommend = new Recommend(products, targetItemId);
      const topSimilarItems = recommend.recommendItems(targetItemId);

      // Convert string ObjectIDs to mongoose ObjectIDs
      if (topSimilarItems) {
        const objectIdsAsMongoose = topSimilarItems.map(
          (id) => new mongoose.Types.ObjectId(id)
        );
        const listRecommendProducts = await Product.find({
          _id: { $in: objectIdsAsMongoose },
        });

        // Sort the products based on the order of topSimilarItems
        const sortlistRecommendProducts = topSimilarItems.map((id) =>
          listRecommendProducts.find((item) => {
            return item._id.toString() == id;
          })
        );
        res.json(sortlistRecommendProducts);
      } else {
        res.status(404);
        throw new Error("Recommended items not found");
      }
    }
  );
}

export default ProductService;