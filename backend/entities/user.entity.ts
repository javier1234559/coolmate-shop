import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Review } from './review.entity';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', default: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg' })
  avatar_img: string;

  @Column('nvarchar')
  name: string;

  @Column('nvarchar', { unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @Column('boolean', { default: false })
  is_google: boolean;

  @Column({ type: 'varchar', nullable: true })
  addresses: string;

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

// @Entity()
// export class UserAddress {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column('nvarchar')
//   address: string;

//   @Column('nvarchar')
//   city: string;

//   @Column('nvarchar')
//   district: string;

//   @Column('nvarchar')
//   commune: string;

//   @Column('varchar')
//   phone: string;

//   @ManyToOne(() => User, (user) => user.addresses)
//   user: User;

// }

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



