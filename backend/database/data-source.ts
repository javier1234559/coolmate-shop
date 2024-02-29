import { DataSource } from "typeorm"
import { Product } from "../entities/product.entity";
import config from "../config/config";

export const connectDB = new DataSource({
  type: "mysql",
  host: config.mysql.host,
  port: config.mysql.port,
  username: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.namedb,
  synchronize: true,
  logging: true,
  entities: [Product],
  subscribers: [],
  migrations: [],
})

connectDB
  .initialize()
  .then(() => {
    console.log("Database connected")
  })
  .catch((error) => console.log(error))

export default connectDB;