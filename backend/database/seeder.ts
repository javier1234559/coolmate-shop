// import "reflect-metadata";
// import { Product, ProductColorSize, Size, Color, ProductMedia } from "../entities/product.entity";
// import { Category } from "../entities/category.entity";
// import { Collection } from "../entities/collection.entity";
// import { Cart, CartItem } from "../entities/cart.entity";
// import { Order, OrderItem } from "../entities/order.entity";
// import { User, UserPayment, UserRole } from "../entities/user.entity";
// import { Review } from "../entities/review.entity";
// import {
//   users, discounts,
//   products, categories, userPayments,
//   carts, cartItems, reviews,
//   orders, orderItems,
//   colors, sizes, productMedia, collections, productColorSizes
// } from "./data";
// import connectDB from "./data-source";
// import { Repository } from "typeorm";
// import bcrypt from 'bcrypt';
// import { Discount } from "../entities/discount.entity";

// class DatabaseSeeder {
//   private connection: any;
//   private cartRepository: Repository<Cart>;
//   private cartItemRepository: Repository<CartItem>;

//   private categoryRepository: Repository<Category>;

//   private orderRepository: Repository<Order>;
//   private orderItemRepository: Repository<OrderItem>;


//   private productRepository: Repository<Product>;
//   private sizeRepository: Repository<Size>;
//   private colorRepository: Repository<Color>;
//   private productColorSizeRepository: Repository<ProductColorSize>;
//   private productMediaRepository: Repository<ProductMedia>;

//   private collectionRepository: Repository<Collection>;

//   private userRepository: Repository<User>;
//   private userPaymentRepository: Repository<UserPayment>;

//   private reviewRepository: Repository<Review>;
//   private discountRepository: Repository<Discount>;

//   constructor() { }


//   async init() {
//     try {
//       this.connection = await connectDB.initialize();
//       console.log("Database connected");
//     } catch (error) {
//       console.error("Error connecting to the database:", error);
//       throw error; // Rethrow the error to stop further execution
//     }

//     this.userRepository = this.connection.getRepository(User);
//     this.userPaymentRepository = this.connection.getRepository(UserPayment);
//     this.productRepository = this.connection.getRepository(Product);
//     this.categoryRepository = this.connection.getRepository(Category);
//     this.collectionRepository = this.connection.getRepository(Collection);
//     this.sizeRepository = this.connection.getRepository(Size);
//     this.colorRepository = this.connection.getRepository(Color);
//     this.productColorSizeRepository = this.connection.getRepository(ProductColorSize);
//     this.productMediaRepository = this.connection.getRepository(ProductMedia);
//     this.cartRepository = this.connection.getRepository(Cart);
//     this.cartItemRepository = this.connection.getRepository(CartItem);
//     this.orderRepository = this.connection.getRepository(Order);
//     this.orderItemRepository = this.connection.getRepository(OrderItem);
//     this.reviewRepository = this.connection.getRepository(Review);
//     this.discountRepository = this.connection.getRepository(Discount);
//   }


//   async seed() {
//     await this.init();

//     try {
//       console.log('Seeding categories...');
//       await this.seedCategories();

//       // console.log('Delivering details...');
//       // await this.deliveredDetails();

//       // console.log('Processing payment results...');
//       // await this.paymentResults();

//       console.log('Seeding discount...');
//       await this.seedDiscounts();

//       console.log('Seeding colors...');
//       await this.seedColors();

//       console.log('Seeding sizes...');
//       await this.seedSizes();

//       console.log('Seeding users...');
//       await this.seedUsers();

//       // console.log('Seeding user addresses...');
//       // await this.seedUserAddresses();

//       console.log('Seeding user payments...');
//       await this.seedUserPayments();

//       console.log('Seeding products...');
//       await this.seedProducts();

//       console.log('Seeding product color sizes...');
//       await this.seedProductColorSizes();

//       console.log('Seeding product media...');
//       await this.seedProductMedia();

//       console.log('Seeding collections...');
//       await this.seedCollections();

//       console.log('Seeding carts...');
//       await this.seedCarts();

//       // console.log('Seeding cart items...');
//       // await this.seedCarttems();

//       // console.log('Seeding orders...');
//       // await this.seedOrders();

//       // console.log('Seeding order items...');
//       // await this.seedOrderItems();

//       console.log('Seeding reviews...');
//       await this.seedReviews();

//       console.log('Seed data inserted successfully');
//     } catch (error) {
//       console.error('Error seeding data:', error);
//     } finally {
//       await this.connection.close();
//     }
//   }
//   seedDiscounts() {
//     const discountsData = this.discountRepository.create(discounts);
//     this.discountRepository.save(discountsData);
//   }

//   private async seedReviews() {
//     for (const review of reviews) {
//       const user = await this.userRepository.findOne({ where: { id: review.user_id } });
//       const product = await this.productRepository.findOne({ where: { id: review.product_id } });
//       if (user && product) {
//         const reviewData = this.reviewRepository.create(review);
//         reviewData.user = user;
//         reviewData.product = product;
//         await this.reviewRepository.save(reviewData);
//       }
//     }
//   }
//   private async seedOrderItems() {
//     for (const orderItem of orderItems) {
//       const order = await this.orderRepository.findOne({ where: { id: orderItem.order_id } });
//       const product = await this.productRepository.findOne({ where: { id: orderItem.product_id } });
//       if (order && product) {
//         const orderItemData = this.orderItemRepository.create(orderItem);
//         orderItemData.order = order;
//         this.orderItemRepository.save(orderItemData);
//       }
//     }
//   }

//   private async seedOrders() {
//     for (const order of orders) {
//       const user = await this.userRepository.findOne({ where: { id: order.user_id } });
//       if (user) {
//         const orderData = this.orderRepository.create(order);
//         orderData.user = user;
//         orderData.items = [];
//         this.orderRepository.save(orderData);
//       }
//     }
//   }

//   private async seedCarttems() {
//     for (const cartItem of cartItems) {
//       const cart = await this.cartRepository.findOne({ where: { id: cartItem.cart_id } });
//       const product = await this.productRepository.findOne({ where: { id: cartItem.product_id } });
//       if (cart && product) {
//         const cartItemData = this.cartItemRepository.create(cartItem);
//         cartItemData.cart = cart;
//         cartItemData.product = product;
//         this.cartItemRepository.save(cartItemData);
//       }
//     }
//   }

//   private async seedCarts() {
//     for (const cart of carts) {
//       const user = await this.userRepository.findOne({ where: { id: cart.user_id } });
//       if (user) {
//         const cartData = this.cartRepository.create(cart);
//         cartData.user = user;
//         cartData.items = [];
//         this.cartRepository.save(cartData);
//       }
//     }
//   }


//   private async seedCategories() {
//     const categoriesData = this.categoryRepository.create(categories);
//     await this.categoryRepository.save(categoriesData);
//   }


//   private async seedUserPayments() {
//     for (const userPayment of userPayments) {
//       const user = await this.userRepository.findOne({ where: { id: userPayment.user_id } });
//       if (user) {
//         const userPaymentData = this.userPaymentRepository.create(userPayment);
//         userPaymentData.user = user;
//         await this.userPaymentRepository.save(userPaymentData);
//       }
//     }
//   }

//   private async seedUsers() {
//     const hashUser = users.map(user => {
//       const hashedPassword = bcrypt.hashSync(user.password, 10);
//       let role = UserRole.USER
//       if (user.role === 'admin') {
//         role = UserRole.ADMIN;
//       }
//       return { ...user, password: hashedPassword, role: role };
//     });

//     const usersData = this.userRepository.create(hashUser);
//     await this.userRepository.save(usersData);
//   }

//   private async seedSizes() {
//     const sizesData = this.sizeRepository.create(sizes);
//     await this.sizeRepository.save(sizesData);
//   }

//   private async seedColors() {
//     const colorsData = this.colorRepository.create(colors);
//     await this.colorRepository.save(colorsData);
//   }

//   private async seedProducts() {
//     for (const product of products) {
//       const category = await this.categoryRepository.findOne({ where: { id: product.category_id } });
//       if (category) {
//         const productData = this.productRepository.create(product);
//         productData.category = category;
//         await this.productRepository.save(productData);
//       }
//     }
//   }

//   private async seedProductColorSizes() {
//     for (const pcs of productColorSizes) {
//       const product = await this.productRepository.findOne({ where: { id: pcs.product_id } });
//       const color = await this.colorRepository.findOne({ where: { id: pcs.color_id } });
//       const size = await this.sizeRepository.findOne({ where: { id: pcs.size_id } });
//       if (product && color && size) {
//         const pcsData = this.productColorSizeRepository.create(pcs);
//         pcsData.product = product;
//         pcsData.color = color;
//         pcsData.size = size;
//         await this.productColorSizeRepository.save(pcsData);
//       }
//     }
//   }

//   private async seedProductMedia() {
//     for (const media of productMedia) {
//       const product = await this.productRepository.findOne({ where: { id: media.product_id } });
//       if (product) {
//         const mediaData = this.productMediaRepository.create(media);
//         mediaData.product = product;
//         await this.productMediaRepository.save(mediaData);
//       }
//     }
//   }

//   private async seedCollections() {
//     for (const collectionData of collections) {
//       const collection = this.collectionRepository.create(collectionData);
//       collection.products = [];
//       for (const id of collectionData.product_ids) {
//         const product = await this.productRepository.findOne({ where: { id: id } });
//         if (product) {
//           collection.products.push(product);
//         }
//       }
//       await this.collectionRepository.save(collection);
//     }
//   }
// }

// async function seeder() {
//   const databaseSeeder = new DatabaseSeeder();
//   await databaseSeeder.seed();
// }


// seeder();
