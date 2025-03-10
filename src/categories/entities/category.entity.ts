// src/categories/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ nullable: true })
  parent_category_id: number;

  @ManyToMany(() => Event, (event) => event.categories)
  events: Event[];
}
