import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  icon: string

  @Column('nvarchar') 
  name: string;

  @Column('text') 
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  modified_at: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}