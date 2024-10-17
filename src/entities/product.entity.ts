import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { AnimalType } from './animalType.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: string; // To store image URLs

  @Column('int')
  stockQuantity: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => AnimalType, (animalType) => animalType.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  animalType: AnimalType;
}
