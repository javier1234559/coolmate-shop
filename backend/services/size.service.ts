import { Request, Response } from "express";
import connectDB from "../database/data-source";
import { FindManyOptions, Like } from "typeorm";
import { ProductColorSize, Size } from "../entities/product.entity";

class SizeService {
  static sizeRepository = connectDB.getRepository(Size);
  static productColorSizeRepository = connectDB.getRepository(ProductColorSize);

  static getSizes = async (_req: Request, res: Response) => {
    const page = parseInt(_req.query._start as string) || 1;
    const pageSize = parseInt(_req.query._end as string) || 10;
    const keyword = _req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<Size> = {
      take: pageSize,
      skip,
      order: { id: 'ASC' },
      where: {},
    };

    try {
      const [sizes, total] = await this.sizeRepository.findAndCount(condition);
      return res.status(200).json(sizes);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  static createSize = async (_req: Request, res: Response) => {
    const { name } = _req.body;

    if (!name) {
      return res.status(400).json({ message: 'Size name is required' });
    }

    const newSize = new Size();
    newSize.name = name;

    try {
      await this.sizeRepository.save(newSize);
      return res.status(201).json({
        message: 'Size created successfully',
        data: newSize
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static getSizeById = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Size with id ${id} is not valid` });
    }

    const size = await this.sizeRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!size) {
      return res.status(404).json({
        message: `Size with id = ${id} is not found`,
      });
    }

    return res.status(200).json(size);
  }

  static updateSize = async (_req: Request, res: Response) => {
    const { id } = _req.params;
    const { name } = _req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Size with id ${id} is not valid` });
    }

    const size = await this.sizeRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!size) {
      return res.status(404).json({
        message: `Size with id = ${id} is not found`,
      });
    }

    size.name = name || size.name;

    try {
      await this.sizeRepository.save(size);
      return res.status(200).json({
        message: `Size with id = ${id} is updated`,
        data: size
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static deleteSize = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Size with id ${id} is not valid` });
    }

    const size = await this.sizeRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!size) {
      return res.status(404).json({
        message: `Size with id = ${id} is not found`,
      });
    }

    try {
      const hasRelations = await this.checkIfSizeHasRelations(parseInt(id));
      if (hasRelations) {
        return res.status(400).json({ message: `Color with ID ${id} has relations with products. Please change all products with this color first` });
      }

      await this.sizeRepository.remove(size);
      return res.status(200).json({
        message: `Size with id = ${id} is deleted`,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  private static checkIfSizeHasRelations = async (sizeId: number): Promise<boolean> => {
    const productColorSize = await this.productColorSizeRepository.findOne({
      where: { size: { id: sizeId } },
    });

    if (productColorSize) {
      return true;
    }
    return false;
  }

}

export default SizeService;