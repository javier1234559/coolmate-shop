import cors from "cors";
import config from "./config/config";
import connectDB from "./database/data-source";
import express, { Express } from "express";
// import dotenv from "dotenv";
// dotenv.config();
// import cookieParser from "cookie-parser";
import productController from "./controller/product.controller";
import collectionController from "./controller/collection.controler";
// import userRoutes from "./routes/userRoutes";
// import orderRoutes from "./routes/orderRoutes";
// import uploadRoutes from "./routes/uploadRoutes";
// import configRoutes from "./routes/configRoutes";
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
const port = config.port;
connectDB
  .initialize()
  .then(() => {
    console.log("Database connected")
  })
  .catch((error) => console.log(error))


// // 2. Base server config (config json(), config cor() ,..)
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());// Enable CORS middleware
// // // 3. Define middleware (authen(), validate() ,...)
app.use('/api/health',(req,res)=>{
    res.send('It work !!');
})

// // // 4  Define router and errorHandler
app.use("/api/products", productController);
app.use("/api/collections", collectionController);
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/upload", uploadRoutes);
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
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);

// Listen for process termination signals
// Function to close the database connection
const closeDBConnection = async () => {
  try {
     console.log("Closing database connection...");
     await connectDB.destroy(); 
     console.log("Database connection closed.");
  } catch (error) {
     console.error("Error closing database connection:", error);
  }
 };


process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down...");
  closeDBConnection().then(() => process.exit());
 });
 
 process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Shutting down...");
  closeDBConnection().then(() => process.exit());
 });

