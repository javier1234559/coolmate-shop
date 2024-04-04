import { Request, Response } from "express";
import connectDB from "../database/data-source";
import { Collection } from "../entities/collection.entity";
import { FindManyOptions, Like } from "typeorm";

class CollectionService {
  static CollectionRepository = connectDB.getRepository(Collection);

  static getCollections = async (_req: Request, res: Response) => {
    const page = parseInt(_req.query._start as string) || 1;
    const pageSize = parseInt(_req.query._end as string) || 10;
    const keyword = _req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<Collection> = {
      take: pageSize,
      skip: skip,
      where: keyword ? [{ title: Like('%' + keyword + '%') }] : undefined,
    };
    
    try {
      const [Collections, total] = await this.CollectionRepository.findAndCount(condition);
      const CollectionDTOs = Collections.map((item: Collection) => ({
        id: item.id,
        imageSrc: item.thumbnail_image,
        title: item.title,
        description: item.description,
        slug: item.slug
      }));

      return res.status(200).json(CollectionDTOs);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  };

  static getCollectionById = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Collection with path ${id} is not valid` });
    }

    const Collection = await this.CollectionRepository.findOne({
      where: { id: parseInt(id) },
      cache: true,
    });

    if (Collection) {
      return res.status(200).json({
        message: `Collection with id = ${id}`,
        data: Collection
      })
    } else {
      return res.status(404).json({
        message: `Collection with id = ${id} is not found`,
      });
    }

  }

  static getBestSellerCollection = async (_req: Request, res: Response) => {
    try {
      const bestSellers = await this.CollectionRepository
        .createQueryBuilder('Collection')
        .leftJoinAndSelect('Collection.orderItems', 'orderItem')
        .select(['Collection.id', 'Collection.name', 'SUM(orderItem.quantity) AS totalQuantity'])
        .groupBy('Collection.id')
        .orderBy('totalQuantity', 'DESC')
        .getRawMany();

      return res.status(200).json({
        message: 'Best-selling Collections',
        data: bestSellers,
      });
    } catch (error) {
      console.error('Error fetching best-selling Collections', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

}

export default CollectionService;