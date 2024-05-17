import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double')
  discountValue: number;

  @Column('nvarchar')
  discountCode: string

  @Column('int')
  quantity: number;
}