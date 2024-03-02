import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product, ProductColorSize, Size, Color, ProductMedia } from "../entities/product.entity";
import { Category } from "../entities/category.entity";
import { Collection } from "../entities/collection.entity";
import config from "../config/config";
import { products, categories, colors, sizes, productMedia, collections, productColorSizes } from "./data";

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

async function initialize() {
  await connectDB.initialize();
  console.log("Database connected");
}

async function seeder() {
  await initialize(); // Wait for the database connection to be established
  const productRepository = connectDB.getRepository(Product);
  const categoryRepository = connectDB.getRepository(Category);
  const collectionRepository = connectDB.getRepository(Collection);
  const sizeRepository = connectDB.getRepository(Size);
  const colorRepository = connectDB.getRepository(Color);
  const productColorSizeRepository = connectDB.getRepository(ProductColorSize);
  const productMediaRepository = connectDB.getRepository(ProductMedia);

  try {

    const sizesData: Size[] = sizeRepository.create(sizes);
    await sizeRepository.save(sizesData);

    const categoriesData = categoryRepository.create(categories);
    await categoryRepository.save(categoriesData);

    const colorsData = colorRepository.create(colors);
    await colorRepository.save(colorsData);

    const productsData = productRepository.create(products);
    productsData.forEach(async (product: any) => {
      const categoryId = 1;
      const category = await categoryRepository.findOne(categoryId);

      if (category) {
        product.category = category;
      }
      await productRepository.save(product);
    });


    const productColorSizes = productColorSizeRepository.create(productMedia);
    productColorSizes.forEach(async (productMedia: any) => {
      const sizeId = productMedia.size_id;
      const colorId = productMedia.color_id;
      const productId = productMedia.product_id;

      const sizeEntity = await sizeRepository.findOne(sizeId);
      const colorEntity = await colorRepository.findOne(colorId);
      const productEntity = await productRepository.findOne(productId);

      productMedia.size = sizeEntity;
      productMedia.color = colorEntity;
      productMedia.product = productEntity;

      await productColorSizeRepository.save(productMedia);
    });

    const productMediaData = productMediaRepository.create(productMedia);
    await productMediaRepository.save(productMediaData);


    // Insert collections
    const collectionsData = collectionRepository.create(collections);
    collectionsData.forEach(async (collection: any) => {
      const productIds: number[] = collection.product_ids;
      productIds.forEach(async (productId: number) => {
        const product = await productRepository.findOne({ where: { id: productId } });
        collection.products.push(product);
      });

      collection.products = products;
      await collectionRepository.save(collection);
    });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seeder();
