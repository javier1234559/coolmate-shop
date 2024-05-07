import { Request, Response } from "express";
import { FindManyOptions } from "typeorm";
import connectDB from "../database/data-source";
import { Cart, CartItem } from "../entities/cart.entity";
import { User } from "../entities/user.entity";
import logger from "../utils/logger";

class CartService {
  static cartRepository = connectDB.getRepository(Cart);
  static userRepository = connectDB.getRepository(User);

  static getMyCart = async (req: Request, res: Response) => {
    const userId = req.user.id;

    if (!userId || isNaN(parseInt(userId))) {
      return res.status(404).json({ message: `Invalid user Id: ${userId}` });
    }

    const cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId
        }
      }
    });

    if (cart == null) {
      return res.status(404).json({ message: `Cart not found with user id : ${userId}` });
    }
    try {
      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getCarts = async (req: Request, res: Response) => {
    const page = parseInt(req.query._start as string) || 1;
    const pageSize = parseInt(req.query._end as string) || 10;
    const skip = (page - 1) * pageSize;

    const condition: FindManyOptions<Cart> = {
      take: pageSize,
      skip: skip,
    };

    try {
      const [carts, total] = await this.cartRepository.findAndCount(condition);
      return res.status(200).json(carts);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }

  };

  static createCart = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { totalprice, items }: { totalprice: number, items: CartItem[] } = req.body;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user == null) {
      return res.status(404).json({ message: `User not found with id: ${userId}` });
    }

    const cart = new Cart();
    cart.totalprice = totalprice;
    cart.items = items;
    cart.user = user;

    try {
      await this.cartRepository.save(cart);
      return res.status(201).json(cart);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static updateCart = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { totalprice, items }: { totalprice: number, items: CartItem[] } = req.body;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user == null) {
      return res.status(404).json({ message: `User not found with id: ${userId}` });
    }

    const cart = new Cart();
    cart.totalprice = totalprice;
    cart.items = items;
    cart.user = user;

    try {
      await this.cartRepository.save(cart);
      return res.status(201).json(cart);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static getCartById = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id || isNaN(parseInt(id))) {
      return res.status(404).json({ message: `Invalid Cart ID: ${id}` });
    }

    const cart = await this.cartRepository.findOne({ where: { id: parseInt(id) } });
    if (cart == null) {
      return res.status(404).json({ message: "Cart not found" });
    }

    try {
      logger.info(`Cart found: ${cart}`);
      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

}

export default CartService;