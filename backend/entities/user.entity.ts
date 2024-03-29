import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Review } from './review.entity';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  name: string;

  @Column('nvarchar', { unique: true })
  email: string;

  @Column('nvarchar')
  password: string;

  @Column('varchar')
  phone: string;

  @Column('nvarchar')
  role: string;

  @OneToMany(() => UserAddress, (address) => address.user, { cascade: true, nullable: true })
  addresses: UserAddress[];

  @OneToMany(() => UserPayment, (payment) => payment.user, { cascade: true, nullable: true })
  payments: UserPayment[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Cart, (cart) => cart.user, { cascade: true })
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user, { nullable: true })
  orders: Order[]

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  modified_at: Date;
}

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  address: string;

  @Column('nvarchar')
  city: string;

  @Column('nvarchar')
  district: string;

  @Column('nvarchar')
  commune: string;

  @Column('varchar')
  phone: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

}

@Entity()
export class UserPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  payment_type: string;

  @Column('varchar')
  provider: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

}



