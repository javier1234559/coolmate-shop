import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @Column('nvarchar')
  name: string;

  @Column('text')
  comment: string;

  @Column('double')
  rating: number;

}
