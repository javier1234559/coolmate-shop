import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reviews, { cascade: true })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, { cascade: true })
  product: Product;

  @Column('text')
  comment: string;

  @Column('double')
  rating: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  review: Promise<User>;
}
