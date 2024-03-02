import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Collection } from './collection.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  seller_id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  brand: string;

  @Column('text')
  description: string;

  @Column('float')
  rating: number;

  @Column('int')
  numReviews: number;

  @Column('float')
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modified_at: Date;

  // Define many-to-one relationship with Category
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  // Define many-to-many relationship with Collection
  @ManyToMany(() => Collection, (collection) => collection.products)
  @JoinTable()
  collections: Collection[];

  // Define one-to-many relationship with ProductMedia
  @OneToMany(() => ProductMedia, (media) => media.product)
  media: ProductMedia[];

  // Define many-to-many relationship with ProductColorSize
  @OneToMany(() => ProductColorSize, (pcs) => pcs.product)
  colorSizes: ProductColorSize[];
}

@Entity()
export class ProductMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  product_id: number;

  @Column('varchar')
  media_type: string;

  @Column('varchar')
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

  @Column('varchar')
  name: string;

  @Column('varchar')
  hex_code: string;
}

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;
}

@Entity()
export class ProductColorSize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  product_id: number;

  @Column('int')
  color_id: number;

  @Column('int')
  size_id: number;

  @Column('int')
  quantity: number;

  // Define many-to-one relationship with Product
  @ManyToOne(() => Product, (product) => product.colorSizes)
  product: Product;

  // Define many-to-one relationship with Color
  @ManyToOne(() => Color, (color) => color.id)
  color: Color;

  // Define many-to-one relationship with Size
  @ManyToOne(() => Size, (size) => size.id)
  size: Size;
}