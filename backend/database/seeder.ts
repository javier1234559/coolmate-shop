import "reflect-metadata";
import { DataSource, FindOneOptions } from "typeorm";
import { Product, ProductColorSize, Size, Color, ProductMedia } from "../entities/product.entity";
import { Category } from "../entities/category.entity";
import { Collection } from "../entities/collection.entity";
import config from "../config/config";
import { products, categories, colors, sizes, productMedia, collections, productColorSizes } from "./data";
import connectDB from "./data-source";

async function seeder() {

  await connectDB
    .initialize()
    .then(() => {
      console.log("Database connected")
    })
    .catch((error) => console.log(error))

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

    const productsData: Product[] = productRepository.create(products);
    for (const product of productsData) {
      const category = await categoryRepository.findOne({ where: { id: 1 } });
      if (category) {
        product.category = category;
      }
      await productRepository.save(product);
    }

    const productColorandQuantity = productColorSizeRepository.create(productColorSizes);
    for (const item of productColorandQuantity) {
      const sizeId = 1;
      const colorId = 1;
      const productId = 1;

      const sizeEntity = await sizeRepository.findOne({ where: { id: sizeId } });
      const colorEntity = await colorRepository.findOne({ where: { id: colorId } });
      const productEntity = await productRepository.findOne({ where: { id: productId } });

      if (sizeEntity) {
        item.size = sizeEntity;
      }
      if (colorEntity) {
        item.color = colorEntity;
      }
      if (productEntity) {
        item.product = productEntity;
      }
      await productColorSizeRepository.save(item);
    }

    const productMediaData = productMediaRepository.create(productMedia);
    await productMediaRepository.save(productMediaData);


    // // Insert collections
    const collectionsData = collectionRepository.create(collections);
    for (const collection of collectionsData) {
      const products = await productRepository.find();
      collection.products = products;
      await collectionRepository.save(collection);
    }


    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seeder();
