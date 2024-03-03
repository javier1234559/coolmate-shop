import "reflect-metadata";
import { DataSource } from "typeorm"
import config from "../config/config";
import { Product, ProductColorSize, Size, Color, ProductMedia } from "../entities/product.entity";
import { Category } from "../entities/category.entity";
import { Collection } from "../entities/collection.entity";

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
});

export default connectDB;