import { Request, Response } from "express";
import connectDB from "../database/data-source";
import { FindManyOptions, Like } from "typeorm";
import { Category } from "../entities/category.entity";

class CategoryService {
  static CategoryRepository = connectDB.getRepository(Category);

  static getCategorys = async (_req: Request, res: Response) => {
    const page = parseInt(_req.query._start as string) || 1;
    const pageSize = parseInt(_req.query._end as string) || 10;
    const keyword = _req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<Category> = {
      take: pageSize,
      skip,
      order: { id: 'ASC' },
      where: {},
    };

    try {
      const [categories, total] = await this.CategoryRepository.findAndCount(condition);
      return res.status(200).json(categories);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  };

  static getCategoryById = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Category with id ${id} is not valid` });
    }

    const category = await this.CategoryRepository.findOne({
      where: { id: parseInt(id) },
      cache: true,
    });

    if (category) {
      return res.status(200).json({
        message: `Category with id = ${id}`,
        data: category
      })
    } else {
      return res.status(404).json({
        message: `Category with id = ${id} is not found`,
      });
    }
  }

  static createCategory = async (_req: Request, res: Response) => {
    const { name, description } = _req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const newCategory = new Category();
    newCategory.name = name;
    newCategory.description = description;

    try {
      await this.CategoryRepository.save(newCategory);
      return res.status(201).json({
        message: 'Category created successfully',
        data: newCategory
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static updateCategory = async (_req: Request, res: Response) => {
    const { id } = _req.params;
    const { name, description } = _req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Category with id ${id} is not valid` });
    }

    const category = await this.CategoryRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({
        message: `Category with id = ${id} is not found`,
      });
    }

    category.name = name || category.name;
    category.description = description || category.description;

    try {
      await this.CategoryRepository.save(category);
      return res.status(200).json({
        message: `Category with id = ${id} is updated`,
        data: category
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static deleteCategory = async (_req: Request, res: Response) => {
    const { id } = _req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Category with id ${id} is not valid` });
    }

    const category = await this.CategoryRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({
        message: `Category with id = ${id} is not found`,
      });
    }

    try {

      const hasRelations = await this.checkIfCategoryHasRelations(parseInt(id));
      if (hasRelations) {
        return res.status(400).json({ message: `Category with ID ${id} has relations with products` });
      }

      await this.CategoryRepository.remove(category);
      return res.status(200).json({
        message: `Category with id = ${id} is deleted`,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  private static checkIfCategoryHasRelations = async (categoryId: number): Promise<boolean> => {
    const category = await this.CategoryRepository.findOne({
      where: { id: categoryId },
      relations: ['products'],
    });

    if (category) {
      return category.products.length > 0;
    }
    return false;
  }

}

export default CategoryService;