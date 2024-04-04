import { Request, Response } from "express";
import connectDB from "../database/data-source";
import { Cart } from "../entities/cart.entity";
import { FindManyOptions, Like } from "typeorm";

class CartService {
  static CartRepository = connectDB.getRepository(Cart);

  static getCarts = async (_req: Request, res: Response) => {
    const page = parseInt(_req.query._start as string) || 1;
    const pageSize = parseInt(_req.query._end as string) || 10;
    const keyword = _req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<Cart> = {
      take: pageSize,
      skip: skip,
      // where: keyword ? [{  : Like('%' + keyword + '%') }] : undefined,
    };

    try {
      const [Carts, total] = await this.CartRepository.findAndCount(condition);
      return res.status(200).json(Carts);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  };

}

export default CartService;