import { Entity, PrimaryGeneratedColumn,  Column, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from "./user.entity";
import { CartItem } from "./cartItem.entity";


@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn() 
  user: User;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
  items: CartItem[];

  @Column({ type: 'decimal', default: 0 })
  totalPrice: number;
}