import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product, ProductColorSize, Size, Color, ProductMedia } from "../entities/product.entity";
import { Category } from "../entities/category.entity";
import { Collection } from "../entities/collection.entity";
import config from "../config/config";

const connectDB = new DataSource({
  type: "mysql",
  host: config.mysql.host,
  port: config.mysql.port,
  username: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.namedb,
  synchronize: true,  // This will automatically create tables based on entities
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
})

// connectDB
//   .initialize()
//   .then(() => {
//     console.log("Database connected")
//   })
//   .catch((error) => console.log(error))

export default connectDB;