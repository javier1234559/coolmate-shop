use coolmatedb;

-- Table for users
CREATE TABLE user (
  id INT PRIMARY KEY,
  name NVARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Table for user addresses
CREATE TABLE user_address (
  id INT PRIMARY KEY,
  user_id INT,
  address VARCHAR(255),
  city VARCHAR(100),
  district VARCHAR(100),
  commune VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table for user payments
CREATE TABLE user_payment (
  id INT PRIMARY KEY,
  user_id INT,
  payment_type VARCHAR(50),
  provider VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table for reviews
CREATE TABLE review (
  id INT PRIMARY KEY,
  user_id INT,
  product_id INT,
  name VARCHAR(255),
  comment VARCHAR(255),
  rating DOUBLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Table for products
CREATE TABLE product (
  id INT PRIMARY KEY,
  seller_id INT,
  category_id INT,
  name VARCHAR(255),
  image VARCHAR(255),
  brand VARCHAR(255),
  description VARCHAR(255),
  rating DOUBLE,
  numReviews INT,
  price DOUBLE,
  countInStock INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (seller_id) REFERENCES user(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Table for categories
CREATE TABLE category (
  id INT PRIMARY KEY,
  name NVARCHAR(255),
  description NVARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for carts
CREATE TABLE cart (
  id INT PRIMARY KEY,
  user_id INT,
  totalprice DOUBLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table for cart items
CREATE TABLE cart_item (
  id INT PRIMARY KEY,
  cart_id INT,
  product_id INT,
  quantity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (cart_id) REFERENCES cart(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Table for orders
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  shippingAddress VARCHAR(255),
  paymentMethod VARCHAR(255),
  paymentResult_id VARCHAR(255),
  itemsPrice DOUBLE,
  taxPrice DOUBLE,
  shippingPrice DOUBLE,
  totalPrice DOUBLE,
  isPaid BOOLEAN,
  paidAt DATE,
  isDelivered BOOLEAN,
  deliveredAt DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (paymentResult_id) REFERENCES paymentResult(id)
);

-- Table for order items
CREATE TABLE order_item (
  id INT PRIMARY KEY,
  order_id INT,
  name VARCHAR(255),
  quantity INT,
  image VARCHAR(255),
  productid VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Table for payment result
CREATE TABLE paymentResult (
  id VARCHAR(255) PRIMARY KEY,
  status VARCHAR(255),
  update_time VARCHAR(255),
  email_address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users
INSERT INTO user (id, name, email, password, phone, role, created_at, modified_at) 
VALUES 
  (1, 'John Doe', 'john@example.com', 'password123', '1234567890', 'user', NOW(), NOW()),
  (2, 'Jane Smith', 'jane@example.com', 'securepass', '9876543210', 'admin', NOW(), NOW());

-- User Addresses
INSERT INTO user_address (id, user_id, address, city, district, commune, phone, created_at, modified_at) 
VALUES 
  (1, 1, '123 Main St', 'Cityville', 'Central', 'Downtown', '1234567890', NOW(), NOW()),
  (2, 2, '456 Oak St', 'Townsville', 'East', 'Suburbia', '9876543210', NOW(), NOW());

-- User Payments
INSERT INTO user_payment (id, user_id, payment_type, provider, created_at, modified_at) 
VALUES 
  (1, 1, 'Credit Card', 'Visa', NOW(), NOW()),
  (2, 2, 'PayPal', 'PayPal Inc.', NOW(), NOW());

-- Reviews
INSERT INTO review (id, user_id, product_id, name, comment, rating, created_at, modified_at) 
VALUES 
  (1, 1, 1, 'John Doe', 'Great product!', 4.5, NOW(), NOW()),
  (2, 2, 2, 'Jane Smith', 'Excellent service!', 5.0, NOW(), NOW());

-- Products
INSERT INTO product (id, seller_id, category_id, name, image, brand, description, rating, numReviews, price, countInStock, created_at, modified_at) 
VALUES 
  (1, 2, 1, 'Laptop', 'laptop.jpg', 'TechCo', 'Powerful laptop with great features', 4.8, 100, 899.99, 50, NOW(), NOW()),
  (2, 2, 2, 'Smartphone', 'phone.jpg', 'MobileCorp', 'High-end smartphone with advanced capabilities', 4.9, 120, 799.99, 30, NOW(), NOW());

-- Categories
INSERT INTO category (id, name, description, created_at, modified_at) 
VALUES 
  (1, 'Electronics', 'Devices and gadgets', NOW(), NOW()),
  (2, 'Mobile', 'Smartphones and accessories', NOW(), NOW());

-- Carts
INSERT INTO cart (id, user_id, totalprice, created_at, modified_at) 
VALUES 
  (1, 1, 899.99, NOW(), NOW()),
  (2, 2, 1599.98, NOW(), NOW());

-- Cart Items
INSERT INTO cart_item (id, cart_id, product_id, quantity, created_at, modified_at) 
VALUES 
  (1, 1, 1, 1, NOW(), NOW()),
  (2, 2, 2, 2, NOW(), NOW());

-- Order Items
INSERT INTO order_item (id, order_id, name, quantity, image, productid, created_at, modified_at) 
VALUES 
  (1, 'ORDER123', 'Laptop', 1, 'laptop.jpg', 'PROD456', NOW(), NOW()),
  (2, 'ORDER456', 'Smartphone', 2, 'phone.jpg', 'PROD789', NOW(), NOW());

-- Payment Results
INSERT INTO paymentResult (id, status, update_time, email_address, created_at, modified_at) 
VALUES 
  ('PAYMENT123', 'Success', '2022-02-29 12:00:00', 'john@example.com', NOW(), NOW()),
  ('PAYMENT456', 'Success', '2022-02-29 14:30:00', 'jane@example.com', NOW(), NOW());

-- Orders
INSERT INTO orders (id, user_id, shippingAddress, paymentMethod, paymentResult_id, itemsPrice, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt, created_at, modified_at) 
VALUES 
  ('ORDER123', 1, '123 Main St, Cityville', 'Credit Card', 'PAYMENT123', 899.99, 90.00, 20.00, 1009.99, true, '2022-02-29', false, NULL, NOW(), NOW()),
  ('ORDER456', 2, '456 Oak St, Townsville', 'PayPal', 'PAYMENT456', 1599.98, 160.00, 30.00, 1789.98, true, '2022-02-29', false, NULL, NOW(), NOW());
use coolmatedb;

SELECT * FROM users ;

-- Table for users
CREATE TABLE user (
  id INT PRIMARY KEY,
  name NVARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Table for user addresses
CREATE TABLE user_address (
  id INT PRIMARY KEY,
  user_id INT,
  address VARCHAR(255),
  city VARCHAR(100),
  district VARCHAR(100),
  commune VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table for user payments
CREATE TABLE user_payment (
  id INT PRIMARY KEY,
  user_id INT,
  payment_type VARCHAR(50),
  provider VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table for reviews
CREATE TABLE review (
  id INT PRIMARY KEY,
  user_id INT,
  product_id INT,
  name VARCHAR(255),
  comment VARCHAR(255),
  rating DOUBLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Table for products
CREATE TABLE product (
  id INT PRIMARY KEY,
  seller_id INT,
  category_id INT,
  name VARCHAR(255),
  image VARCHAR(255),
  brand VARCHAR(255),
  description VARCHAR(255),
  rating DOUBLE,
  numReviews INT,
  price DOUBLE,
  countInStock INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (seller_id) REFERENCES user(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Table for categories
CREATE TABLE category (
  id INT PRIMARY KEY,
  name NVARCHAR(255),
  description NVARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for carts
CREATE TABLE cart (
  id INT PRIMARY KEY,
  user_id INT,
  totalprice DOUBLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table for cart items
CREATE TABLE cart_item (
  id INT PRIMARY KEY,
  cart_id INT,
  product_id INT,
  quantity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (cart_id) REFERENCES cart(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Table for orders
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  shippingAddress VARCHAR(255),
  paymentMethod VARCHAR(255),
  paymentResult_id VARCHAR(255),
  itemsPrice DOUBLE,
  taxPrice DOUBLE,
  shippingPrice DOUBLE,
  totalPrice DOUBLE,
  isPaid BOOLEAN,
  paidAt DATE,
  isDelivered BOOLEAN,
  deliveredAt DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (paymentResult_id) REFERENCES paymentResult(id)
);

-- Table for order items
CREATE TABLE order_item (
  id INT PRIMARY KEY,
  order_id INT,
  name VARCHAR(255),
  quantity INT,
  image VARCHAR(255),
  productid VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Table for payment result
CREATE TABLE paymentResult (
  id VARCHAR(255) PRIMARY KEY,
  status VARCHAR(255),
  update_time VARCHAR(255),
  email_address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users
INSERT INTO user (id, name, email, password, phone, role, created_at, modified_at) 
VALUES 
  (1, 'John Doe', 'john@example.com', 'password123', '1234567890', 'user', NOW(), NOW()),
  (2, 'Jane Smith', 'jane@example.com', 'securepass', '9876543210', 'admin', NOW(), NOW());

-- User Addresses
INSERT INTO user_address (id, user_id, address, city, district, commune, phone, created_at, modified_at) 
VALUES 
  (1, 1, '123 Main St', 'Cityville', 'Central', 'Downtown', '1234567890', NOW(), NOW()),
  (2, 2, '456 Oak St', 'Townsville', 'East', 'Suburbia', '9876543210', NOW(), NOW());

-- User Payments
INSERT INTO user_payment (id, user_id, payment_type, provider, created_at, modified_at) 
VALUES 
  (1, 1, 'Credit Card', 'Visa', NOW(), NOW()),
  (2, 2, 'PayPal', 'PayPal Inc.', NOW(), NOW());

-- Reviews
INSERT INTO review (id, user_id, product_id, name, comment, rating, created_at, modified_at) 
VALUES 
  (1, 1, 1, 'John Doe', 'Great product!', 4.5, NOW(), NOW()),
  (2, 2, 2, 'Jane Smith', 'Excellent service!', 5.0, NOW(), NOW());

-- Products
INSERT INTO product (id, seller_id, category_id, name, image, brand, description, rating, numReviews, price, countInStock, created_at, modified_at) 
VALUES 
  (1, 2, 1, 'Laptop', 'laptop.jpg', 'TechCo', 'Powerful laptop with great features', 4.8, 100, 899.99, 50, NOW(), NOW()),
  (2, 2, 2, 'Smartphone', 'phone.jpg', 'MobileCorp', 'High-end smartphone with advanced capabilities', 4.9, 120, 799.99, 30, NOW(), NOW());

-- Categories
INSERT INTO category (id, name, description, created_at, modified_at) 
VALUES 
  (1, 'Electronics', 'Devices and gadgets', NOW(), NOW()),
  (2, 'Mobile', 'Smartphones and accessories', NOW(), NOW());

-- Carts
INSERT INTO cart (id, user_id, totalprice, created_at, modified_at) 
VALUES 
  (1, 1, 899.99, NOW(), NOW()),
  (2, 2, 1599.98, NOW(), NOW());

-- Cart Items
INSERT INTO cart_item (id, cart_id, product_id, quantity, created_at, modified_at) 
VALUES 
  (1, 1, 1, 1, NOW(), NOW()),
  (2, 2, 2, 2, NOW(), NOW());

-- Order Items
INSERT INTO order_item (id, order_id, name, quantity, image, productid, created_at, modified_at) 
VALUES 
  (1, 'ORDER123', 'Laptop', 1, 'laptop.jpg', 'PROD456', NOW(), NOW()),
  (2, 'ORDER456', 'Smartphone', 2, 'phone.jpg', 'PROD789', NOW(), NOW());

-- Payment Results
INSERT INTO paymentResult (id, status, update_time, email_address, created_at, modified_at) 
VALUES 
  ('PAYMENT123', 'Success', '2022-02-29 12:00:00', 'john@example.com', NOW(), NOW()),
  ('PAYMENT456', 'Success', '2022-02-29 14:30:00', 'jane@example.com', NOW(), NOW());

-- Orders
INSERT INTO orders (id, user_id, shippingAddress, paymentMethod, paymentResult_id, itemsPrice, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt, created_at, modified_at) 
VALUES 
  ('ORDER123', 1, '123 Main St, Cityville', 'Credit Card', 'PAYMENT123', 899.99, 90.00, 20.00, 1009.99, true, '2022-02-29', false, NULL, NOW(), NOW()),
  ('ORDER456', 2, '456 Oak St, Townsville', 'PayPal', 'PAYMENT456', 1599.98, 160.00, 30.00, 1789.98, true, '2022-02-29', false, NULL, NOW(), NOW());
use coolmatedb;

SELECT * FROM users ;

-- Table for users
CREATE TABLE user (
  id INT PRIMARY KEY,
  name NVARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Table for user addresses
CREATE TABLE user_address (
  id INT PRIMARY KEY,
  user_id INT,
  address VARCHAR(255),
  city VARCHAR(100),
  district VARCHAR(100),
  commune VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table for user payments
CREATE TABLE user_payment (
  id INT PRIMARY KEY,
  user_id INT,
  payment_type VARCHAR(50),
  provider VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table for reviews
CREATE TABLE review (
  id INT PRIMARY KEY,
  user_id INT,
  product_id INT,
  name VARCHAR(255),
  comment VARCHAR(255),
  rating DOUBLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Table for products
CREATE TABLE product (
  id INT PRIMARY KEY,
  seller_id INT,
  category_id INT,
  name VARCHAR(255),
  image VARCHAR(255),
  brand VARCHAR(255),
  description VARCHAR(255),
  rating DOUBLE,
  numReviews INT,
  price DOUBLE,
  countInStock INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (seller_id) REFERENCES user(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Table for categories
CREATE TABLE category (
  id INT PRIMARY KEY,
  name NVARCHAR(255),
  description NVARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for carts
CREATE TABLE cart (
  id INT PRIMARY KEY,
  user_id INT,
  totalprice DOUBLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Table for cart items
CREATE TABLE cart_item (
  id INT PRIMARY KEY,
  cart_id INT,
  product_id INT,
  quantity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (cart_id) REFERENCES cart(id),
  FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Table for orders
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  shippingAddress VARCHAR(255),
  paymentMethod VARCHAR(255),
  paymentResult_id VARCHAR(255),
  itemsPrice DOUBLE,
  taxPrice DOUBLE,
  shippingPrice DOUBLE,
  totalPrice DOUBLE,
  isPaid BOOLEAN,
  paidAt DATE,
  isDelivered BOOLEAN,
  deliveredAt DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (paymentResult_id) REFERENCES paymentResult(id)
);

-- Table for order items
CREATE TABLE order_item (
  id INT PRIMARY KEY,
  order_id INT,
  name VARCHAR(255),
  quantity INT,
  image VARCHAR(255),
  productid VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Table for payment result
CREATE TABLE paymentResult (
  id VARCHAR(255) PRIMARY KEY,
  status VARCHAR(255),
  update_time VARCHAR(255),
  email_address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users
INSERT INTO user (id, name, email, password, phone, role, created_at, modified_at) 
VALUES 
  (1, 'John Doe', 'john@example.com', 'password123', '1234567890', 'user', NOW(), NOW()),
  (2, 'Jane Smith', 'jane@example.com', 'securepass', '9876543210', 'admin', NOW(), NOW());

-- User Addresses
INSERT INTO user_address (id, user_id, address, city, district, commune, phone, created_at, modified_at) 
VALUES 
  (1, 1, '123 Main St', 'Cityville', 'Central', 'Downtown', '1234567890', NOW(), NOW()),
  (2, 2, '456 Oak St', 'Townsville', 'East', 'Suburbia', '9876543210', NOW(), NOW());

-- User Payments
INSERT INTO user_payment (id, user_id, payment_type, provider, created_at, modified_at) 
VALUES 
  (1, 1, 'Credit Card', 'Visa', NOW(), NOW()),
  (2, 2, 'PayPal', 'PayPal Inc.', NOW(), NOW());

-- Reviews
INSERT INTO review (id, user_id, product_id, name, comment, rating, created_at, modified_at) 
VALUES 
  (1, 1, 1, 'John Doe', 'Great product!', 4.5, NOW(), NOW()),
  (2, 2, 2, 'Jane Smith', 'Excellent service!', 5.0, NOW(), NOW());

-- Products
INSERT INTO product (id, seller_id, category_id, name, image, brand, description, rating, numReviews, price, countInStock, created_at, modified_at) 
VALUES 
  (1, 2, 1, 'Laptop', 'laptop.jpg', 'TechCo', 'Powerful laptop with great features', 4.8, 100, 899.99, 50, NOW(), NOW()),
  (2, 2, 2, 'Smartphone', 'phone.jpg', 'MobileCorp', 'High-end smartphone with advanced capabilities', 4.9, 120, 799.99, 30, NOW(), NOW());

-- Categories
INSERT INTO category (id, name, description, created_at, modified_at) 
VALUES 
  (1, 'Electronics', 'Devices and gadgets', NOW(), NOW()),
  (2, 'Mobile', 'Smartphones and accessories', NOW(), NOW());

-- Carts
INSERT INTO cart (id, user_id, totalprice, created_at, modified_at) 
VALUES 
  (1, 1, 899.99, NOW(), NOW()),
  (2, 2, 1599.98, NOW(), NOW());

-- Cart Items
INSERT INTO cart_item (id, cart_id, product_id, quantity, created_at, modified_at) 
VALUES 
  (1, 1, 1, 1, NOW(), NOW()),
  (2, 2, 2, 2, NOW(), NOW());

-- Order Items
INSERT INTO order_item (id, order_id, name, quantity, image, productid, created_at, modified_at) 
VALUES 
  (1, 'ORDER123', 'Laptop', 1, 'laptop.jpg', 'PROD456', NOW(), NOW()),
  (2, 'ORDER456', 'Smartphone', 2, 'phone.jpg', 'PROD789', NOW(), NOW());

-- Payment Results
INSERT INTO paymentResult (id, status, update_time, email_address, created_at, modified_at) 
VALUES 
  ('PAYMENT123', 'Success', '2022-02-29 12:00:00', 'john@example.com', NOW(), NOW()),
  ('PAYMENT456', 'Success', '2022-02-29 14:30:00', 'jane@example.com', NOW(), NOW());

-- Orders
INSERT INTO orders (id, user_id, shippingAddress, paymentMethod, paymentResult_id, itemsPrice, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt, created_at, modified_at) 
VALUES 
  ('ORDER123', 1, '123 Main St, Cityville', 'Credit Card', 'PAYMENT123', 899.99, 90.00, 20.00, 1009.99, true, '2022-02-29', false, NULL, NOW(), NOW()),
  ('ORDER456', 2, '456 Oak St, Townsville', 'PayPal', 'PAYMENT456', 1599.98, 160.00, 30.00, 1789.98, true, '2022-02-29', false, NULL, NOW(), NOW());

select * from orders