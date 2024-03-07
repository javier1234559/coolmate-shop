import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column('nvarchar')
  shippingAddress: string;

  @Column('nvarchar')
  paymentMethod: string;

  @OneToOne(() => PaymentResult, (paymentResult) => paymentResult.order, { cascade: true })
  @JoinColumn()
  paymentResult: PaymentResult;

  @OneToMany(() => OrderItem, (item) => item.order, { nullable: true, cascade: true })
  items: OrderItem[];

  @Column('double')
  itemsPrice: number;

  @Column('double')
  taxPrice: number;

  @Column('double')
  shippingPrice: number;

  @Column('double')
  totalPrice: number;

  @Column({ type: 'boolean', default: true })
  isPaid: boolean;

  @Column({ type: 'timestamp', nullable: true })
  paidAt: Date;

  @Column({ type: 'boolean', default: true })
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
  image: string;

  @Column('int')
  quantity: number;

  @OneToMany(() => Product, (product) => product.orderItems, { eager: true })
  product: Product;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modified_at: Date;
}

@Entity()
export class PaymentResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('nvarchar')
  status: string;

  @Column('datetime')
  update_time: string;

  @Column('varchar')
  email_address: string;

  @OneToOne(() => Order, (order) => order.paymentResult)
  @JoinColumn()
  order: Order;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modified_at: Date;
}

