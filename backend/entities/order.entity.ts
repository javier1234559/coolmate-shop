import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

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

  @OneToMany(() => OrderItem, (item) => item.order, { nullable: true })
  items: OrderItem[];

  @Column('double')
  itemsPrice: number;

  @Column('double')
  taxPrice: number;

  @Column('double')
  shippingPrice: number;

  @Column('double')
  totalPrice: number;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ type: 'timestamp', nullable: true })
  paidAt: Date;

  @Column({ default: false })
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
  name: string;

  @Column('int')
  quantity: number;

  @Column('nvarchar')
  image: string;

  @Column('nvarchar')
  productid: string;

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

