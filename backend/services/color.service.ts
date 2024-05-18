import { Request, Response } from "express";
import connectDB from "../database/data-source";
import { FindManyOptions, Like } from "typeorm";
import { Color, Product, ProductColorSize } from "../entities/product.entity";

class ColorService {
  static colorRepository = connectDB.getRepository(Color);
  static productColorSizeRepository = connectDB.getRepository(ProductColorSize);

  static getColors = async (_req: Request, res: Response) => {
    const page = parseInt(_req.query._start as string) || 1;
    const pageSize = parseInt(_req.query._end as string) || 10;
    const keyword = _req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<Color> = {
      take: pageSize,
      skip,
      order: { id: 'ASC' },
      where: {},
    };

    try {
      const [colors, total] = await this.colorRepository.findAndCount(condition);
      return res.status(200).json(colors);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
  static getColorById = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Color with id ${id} is not valid` });
    }

    const color = await this.colorRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!color) {
      return res.status(404).json({
        message: `Color with id = ${id} is not found`,
      });
    }

    return res.status(200).json(color);
  }

  static createColor = async (_req: Request, res: Response) => {
    const { name, hex_code } = _req.body;

    if (!name || !hex_code) {
      return res.status(400).json({ message: 'Color name and hex code are required' });
    }

    const newColor = new Color();
    newColor.name = name;
    newColor.hex_code = hex_code;

    try {
      await this.colorRepository.save(newColor);
      return res.status(201).json({
        message: 'Color created successfully',
        data: newColor
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static updateColor = async (_req: Request, res: Response) => {
    const { id } = _req.params;
    const { name, hex_code } = _req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Color with id ${id} is not valid` });
    }

    const color = await this.colorRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!color) {
      return res.status(404).json({
        message: `Color with id = ${id} is not found`,
      });
    }

    color.name = name || color.name;
    color.hex_code = hex_code || color.hex_code;

    try {
      await this.colorRepository.save(color);
      return res.status(200).json({
        message: `Color with id = ${id} is updated`,
        data: color
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static deleteColor = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Color with id ${id} is not valid` });
    }

    const color = await this.colorRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!color) {
      return res.status(404).json({
        message: `Color with id = ${id} is not found`,
      });
    }

    try {
      const hasRelations = await this.checkIfColorHasRelations(parseInt(id));
      if (hasRelations) {
        return res.status(400).json({ message: `Color with ID ${id} has relations with products. Please change all products with this color first` });
      }

      await this.colorRepository.remove(color);
      return res.status(200).json({
        message: `Color with id = ${id} is deleted`,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  private static checkIfColorHasRelations = async (colorId: number): Promise<boolean> => {
    const productColorSize = await this.productColorSizeRepository.findOne({
      where: { color: { id: colorId } },
    });

    if (productColorSize) {
      return true;
    }
    return false;
  }
}

export default ColorService;