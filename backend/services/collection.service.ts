import { Request, Response } from "express";
import connectDB from "../database/data-source";
import { Collection } from "../entities/collection.entity";
import { FindManyOptions, Like } from "typeorm";
import { Product } from "../entities/product.entity";

class CollectionService {
  static collectionRepository = connectDB.getRepository(Collection);
  static productRepository = connectDB.getRepository(Product);

  static getCollections = async (_req: Request, res: Response) => {
    const page = parseInt(_req.query._start as string) || 1;
    const pageSize = parseInt(_req.query._end as string) || 10;
    const keyword = _req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<Collection> = {
      take: pageSize,
      skip: skip,
      where: keyword ? [{ title: Like('%' + keyword + '%') }] : undefined,
      relations: ['products', 'products.colorSizes', 'products.colorSizes.color', 'products.colorSizes.size'],
    };

    try {
      const [collections, total] = await this.collectionRepository.findAndCount(condition);
      return res.status(200).json(collections);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  };

  static getCollectionById = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Collection with path ${id} is not valid` });
    }

    const collection = await this.collectionRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (collection) {
      return res.status(200).json(collection)
    } else {
      return res.status(404).json({
        message: `collection with id = ${id} is not found`,
      });
    }

  };

  static getCollectionBySlug = async (_req: Request, res: Response) => {
    const { slug } = _req.params;

    const collection = await this.collectionRepository.findOne({
      where: { slug: slug },
      relations: ['products', 'products.colorSizes', 'products.colorSizes.color', 'products.colorSizes.size'],
    });

    if (collection) {
      return res.status(200).json(collection)
    } else {
      return res.status(404).json({
        message: `collection with slug = ${slug} is not found`,
      });
    }
  }

  static createCollection = async (_req: Request, res: Response) => {
    const { title, description, thumbnail_image, slug, products } = _req.body;

    if (!title || !description || !thumbnail_image || !slug) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const listProducts = await this.productRepository.find({ where: products.map((product: any) => ({ id: product.id })) });

    try {
      const newCollection = this.collectionRepository.create({
        title,
        description,
        thumbnail_image,
        slug,
        products: listProducts,
      });

      await this.collectionRepository.save(newCollection);
      return res.status(201).json(newCollection);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  static updateCollection = async (_req: Request, res: Response) => {
    const { id } = _req.params;
    const { title, description, thumbnail_image, slug, is_active, product_id } = _req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Collection with path ${id} is not valid` });
    }

    if (!title || !description || !thumbnail_image || !slug || !is_active || !product_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const collection = await this.collectionRepository.findOne({
        where: { id: parseInt(id) },
      });

      if (!collection) {
        return res.status(404).json({
          message: `Collection with id = ${id} is not found`,
        });
      }

      if (product_id) {
        const product = await this.productRepository.findOne({ where: { id: product_id } });
        if (!product) {
          return res.status(404).json({
            message: `Product with id = ${product_id} is not found`,
          });
        }
        collection.products = [product];
      }

      collection.title = title;
      collection.description = description;
      collection.thumbnail_image = thumbnail_image;
      collection.slug = slug;
      collection.is_active = is_active;

      await this.collectionRepository.save(collection);
      return res.status(200).json(collection);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  static deleteCollection = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Collection with path ${id} is not valid` });
    }

    try {
      const collection = await this.collectionRepository.findOne({
        where: { id: parseInt(id) },
      });

      if (!collection) {
        return res.status(404).json({
          message: `Collection with id = ${id} is not found`,
        });
      }

      await this.collectionRepository.remove(collection);
      return res.status(200).json({ message: 'Collection deleted successfully' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

}

export default CollectionService;