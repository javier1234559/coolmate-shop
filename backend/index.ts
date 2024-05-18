import cors from "cors";
import express, { Express } from "express";
import config from "./config/config";
// import cookieParser from "cookie-parser";
import authController from "./controller/auth.controller";
import userController from "./controller/user.controller";
import categoryController from "./controller/category.controller";
import productController from "./controller/product.controller";
import cartController from "./controller/cart.controller";
import orderController from "./controller/order.controller";
import collectionController from "./controller/collection.controler";
import uploadController from "./controller/upload.controller";
import connectDB from "./database/data-source";
import logger from "./utils/logger";
import colorController from "./controller/color.controller";
import sizeController from "./controller/size.controller";
// import { notFound, errorHandler } from "./middleware/errorMiddleware";

// // -------------------------------------------
// // STEP TO CREATE SERVER API
// // 1. Initialize configuration variables, import necessary modules, and connect to the database
// // 2. Base server config (config json(), config cor() ,..)
// // 3. Define middleware (authen(), validate() ,...)
// // 4  Define router
// // 5. Start server
// // --------------------------------------------

// // 1. Initialize configuration variables, import necessary modules, and connect to the database
const PORT  = config.port;
const MODE = config.mode;
connectDB
  .initialize()


// // 2. Base server config (config json(), config cor() ,..)
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());// Enable CORS middleware

// // // 3. Define middleware (authen(), validate() ,...)
app.use('/api/health',(req,res)=>{
    logger.info('Health check');
    res.send('It work 123!!');
})

// // // 4  Define router and errorHandler
app.use("/api/auth", authController);
app.use("/api/users", userController);
app.use("/api/products", productController);
app.use("/api/collections", collectionController);
app.use("/api/categories", categoryController);
app.use("/api/colors", colorController);
app.use("/api/sizes", sizeController);
app.use("/api/carts", cartController);
app.use("/api/orders", orderController);
app.use("/api/upload", uploadController);
// app.use("/api/config", configRoutes);

// if (process.env.NODE_ENV === "production") {
// } else {
//   const __dirname = path.resolve();
//   app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//   app.get("/", (req, res) => {
//     res.send("API is running....");
//   });
// }
// app.use(notFound);
// app.use(errorHandler);

// // 5. Start server
app.listen(PORT, () =>
  logger.info(`Server running in ${MODE} mode on port ${PORT}`)
);

// Listen for process termination signals
// Function to close the database connection
// const closeDBConnection = async () => {
//   try {
//      console.log("Closing database connection...");
//      await connectDB.destroy(); 
//      console.log("Database connection closed.");
//   } catch (error) {
//      console.error("Error closing database connection:", error);
//   }
//  };


// process.on("SIGINT", () => {
//   console.log("Received SIGINT. Shutting down...");
//   closeDBConnection().then(() => process.exit());
//  });
 
//  process.on("SIGTERM", () => {
//   console.log("Received SIGTERM. Shutting down...");
//   closeDBConnection().then(() => process.exit());
//  });

