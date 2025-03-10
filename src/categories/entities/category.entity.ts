import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ length: 100, unique: true })
  name: string;

  // La relation avec la catégorie parente
  @ManyToOne(() => Category, (category) => category.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_category_id' })
  parent: Category;

  // Les sous-catégories
  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @ManyToMany(() => Event, (event) => event.categories)
  events: Event[];
}
