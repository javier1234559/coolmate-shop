import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Category } from './category.entity';
import { Collection } from './collection.entity';
import { CartItem } from './cart.entity';
import { Review } from './review.entity';
import { OrderItem } from './order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  seller_id: number;

  @Column('text')
  name: string;

  @Column('text')
  brand: string;

  @Column('text')
  description: string;

  @Column('float')
  rating: number;

  @Column('varchar', { length: 255, unique: true })
  slug: string;

  @Column('int')
  numReviews: number;

  @Column('float')
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modified_at: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => Collection, (collection) => collection.products, { nullable: true })
  collections: Collection[];

  @OneToMany(() => ProductMedia, (media) => media.product, { cascade: true, eager: true })
  media: ProductMedia[];

  @OneToMany(() => ProductColorSize, (pcs) => pcs.product, { nullable: true, eager: true })
  colorSizes: ProductColorSize[];

  @OneToOne(() => CartItem, (cartItem) => cartItem.product, { nullable: true })
  cartItems: CartItem[];

  @OneToOne(() => CartItem, (cartItem) => cartItem.product, { nullable: true })
  orderItems: OrderItem[];

  @OneToMany(() => Review, (review) => review.product, { nullable: true })
  reviews: Review[]
}

@Entity()
export class ProductMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  media_type: string;

  @Column('nvarchar')
  media_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modified_at: Date;

  // Define many-to-one relationship with Product
  @ManyToOne(() => Product, (product) => product.media)
  product: Product;
}

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  name: string;

  @Column('nvarchar')
  hex_code: string;

  @OneToMany(() => ProductColorSize, (pcs) => pcs.size)
  colorSizes: ProductColorSize[];
}

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  name: string;

  @OneToMany(() => ProductColorSize, (pcs) => pcs.size)
  colorSizes: ProductColorSize[];
}

@Entity()
export class ProductColorSize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Product, (product) => product.colorSizes, { cascade: true })
  product: Product;

  @ManyToOne(() => Color, (color) => color.colorSizes, { cascade: true, eager: true })
  color: Color;

  @ManyToOne(() => Size, (size) => size.colorSizes, { cascade: true, eager: true })
  size: Size;
}