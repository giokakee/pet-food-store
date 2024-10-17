import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { Cart } from './cart.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => Cart, (cart) => cart.id)
  products: Cart[];

  @Column({ type: 'decimal' })
  totalAmount: number;

  @Column({ default: 'pending' }) // Possible statuses: pending, paid, failed, etc.
  status: string;

  @Column()
  paymentMethod: string; // Visa, MasterCard, PayPal
}
