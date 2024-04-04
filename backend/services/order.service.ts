import { Request, Response } from "express";
import connectDB from "../database/data-source";
import { Order } from "../entities/order.entity";
import { FindManyOptions, Like } from "typeorm";

class OrderService {
  static OrderRepository = connectDB.getRepository(Order);

  static getOrders = async (_req: Request, res: Response) => {
    const page = parseInt(_req.query._start as string) || 1;
    const pageSize = parseInt(_req.query._end as string) || 10;
    const keyword = _req.query.keyword as string;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<Order> = {
      take: pageSize,
      skip: skip,
      // where: keyword ? [{  : Like('%' + keyword + '%') }] : undefined,
    };

    try {
      const [Orders, total] = await this.OrderRepository.findAndCount(condition);
      return res.status(200).json(Orders);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  };

}

export default OrderService;