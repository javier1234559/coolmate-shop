import "reflect-metadata";
import { DataSource } from "typeorm"
import config from "../config/config";
import { Product, ProductColorSize, Size, Color, ProductMedia } from "../entities/product.entity";
import { Category } from "../entities/category.entity";
import { Collection } from "../entities/collection.entity";
import { Order, OrderItem, PaymentResult } from "../entities/order.entity";
import { Review } from "../entities/review.entity";
import { User, UserAddress, UserPayment } from "../entities/user.entity";
import { Cart, CartItem } from "../entities/cart.entity";

const connectDB = new DataSource({
  type: "mysql",
  host: config.mysql.host,
  port: config.mysql.port,
  username: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.namedb,
  synchronize: true,
  logging: true,
  entities: [
    User,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Review,
    UserAddress,
    UserPayment,
    PaymentResult,
    OrderItem,
    Product,
    ProductColorSize,
    Size,
    Color,
    ProductMedia,
    Category,
    Collection
  ],
  subscribers: [],
  migrations: [],
  charset: "utf8mb4",
});

export default connectDB;