import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';


@Entity()
export class PaymentResult {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id: string;

  @Column('nvarchar')
  status: string;

  @Column('nvarchar')
  payment_type: string;

  @Column('varchar')
  provider: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modified_at: Date;
}

@Entity()
export class DeliveryDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar')
  status: string;

  @Column('datetime')
  updateTime: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modified_at: Date;
}



@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column('nvarchar')
  shippingAddress: string;
  
  @Column('nvarchar')
  noteFromCustomer: string;

  @Column('nvarchar')
  paymentMethod: string;

  @OneToOne(() => DeliveryDetail, { cascade: true })
  @JoinColumn()
  deliveryDetail: DeliveryDetail;

  @OneToOne(() => PaymentResult, { cascade: true })
  @JoinColumn()
  paymentResult: PaymentResult;

  @OneToMany(() => OrderItem, (item) => item.order, { nullable: true, cascade: true })
  items: OrderItem[];

  @Column('double')
  itemsPrice: number;

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

