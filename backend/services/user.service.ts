import { Request, Response } from "express";
import connectDB from "../database/data-source";
import { User } from "../entities/user.entity";
import { FindManyOptions, Like } from "typeorm";

class UserService {
  static UserRepository = connectDB.getRepository(User);

  static getUsers = async (_req: Request, res: Response) => {
    const page = parseInt(_req.query._start as string) || 1;
    const pageSize = parseInt(_req.query._end as string) || 10;
    const keyword = _req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<User> = {
      take: pageSize,
      skip: skip,
      where: keyword ? [{ name: Like('%' + keyword + '%') }] : undefined,
    };

    try {
      const [Users, total] = await this.UserRepository.findAndCount(condition);
      return res.status(200).json(Users);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  };

}

export default UserService;