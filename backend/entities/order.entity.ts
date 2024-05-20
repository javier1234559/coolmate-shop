import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';


export enum PaymentMethod {
  COD = 'COD',
  MOMO = 'MOMO',
  ZALOPAY = 'ZALOPAY',
}

export enum OrderStatus {
  PENDING = 'Chờ duyệt',
  APPROVED = 'Đã Duyệt',
  REJECTED = 'Đã bị Từ chối',
  DELIVERED = 'Đã giao',
  IN_TRANSIT = 'Đang vận chuyển',
}

export enum PaymentStatus {
  UNPAID = 'Chưa Thanh Toán',
  PAID = 'Đã Thanh Toán',
  PAYMENT_FAILED = 'Thanh Toán thất bại',
}


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar', { unique: true, nullable: true })
  id_payment: string;

  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  user: User;

  // This is the user who received the order

  @Column('nvarchar')
  name: string

  @Column('nvarchar')
  phone: string;

  @Column('nvarchar', { nullable: true })
  email: string;

  @Column('nvarchar')
  shippingAddress: string;

  @Column('nvarchar')
  noteFromCustomer: string;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.UNPAID
  })
  paymentStatus: PaymentStatus;

  @Column({
    type: "enum",
    enum: PaymentMethod,
    default: PaymentMethod.COD
  })
  paymentMethod: PaymentMethod;

  @OneToMany(() => OrderItem, (item) => item.order, { nullable: true, cascade: true })
  items: OrderItem[];

  @Column('double')
  totalPrice: number;

  @Column({ type: 'boolean', default: false })
  isPaid: boolean;

  @Column({ type: 'timestamp', nullable: true })
  paidAt: Date;

  @Column({ type: 'boolean', default: false })
  isDelivered: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modified_at: Date;
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @Column('nvarchar')
  product_slug: string;

  @Column('nvarchar')
  name: string

  @Column('nvarchar', { nullable: true })
  color: string;

  @Column('nvarchar', { nullable: true })
  size: string;

  @Column('nvarchar')
  image: string;

  @Column('int')
  quantity: number;

  @Column('double')
  price: number;

  @Column('double')
  totalPrice: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modified_at: Date;
}

