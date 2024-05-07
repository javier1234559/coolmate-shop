import { Request, Response } from "express";
import connectDB from "../database/data-source";
import { User } from "../entities/user.entity";
import { FindManyOptions, Like } from "typeorm";
import config from "../config/config";

class UserService {
  static userRepository = connectDB.getRepository(User);

  static getUsers = async (req: Request, res: Response) => {
    const page = parseInt(req.query._start as string) || 1;
    const pageSize = parseInt(req.query._end as string) || 10;
    const keyword = req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<User> = {
      take: pageSize,
      skip: skip,
      where: keyword ? [{ name: Like('%' + keyword + '%') }] : undefined,
    };

    try {
      const [Users, total] = await this.userRepository.findAndCount(condition);
      return res.status(200).json(Users);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  };

  static getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Invalid user ID: ${id}` });
    }

    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: `user with ID ${id} not found` });
    }

    return res.status(200).json(user);
  }

  static createUser = async (req: Request, res: Response) => {
    try {
      //check required fields
      if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
      }

      //check exist email 
      const user = await this.userRepository.findOne({
        where: { email: req.body.email },
      });
      if (user) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const newUser = await this.userRepository.save(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  static updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Invalid user ID: ${id}` });
    }

    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: `user with ID ${id} not found` });
    }

    try {
      const updatedUser = await this.userRepository.save({
        ...user,
        ...req.body,
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Invalid user ID: ${id}` });
    }

    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: `user with ID ${id} not found` });
    }

    try {
      await this.userRepository.remove(user);
      return res.status(200).json({ message: 'user deleted' });
    } catch (error) {
      console.error('Error deleting user', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

}

export default UserService;