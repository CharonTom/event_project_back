// src/events/event.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { CalendarEvent } from '../../calendar-event/entities/calendar-event.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  event_id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'datetime' })
  start_date: Date;

  @Column({ type: 'datetime' })
  end_date: Date;

  @Column({ length: 255 })
  location: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ type: 'decimal', precision: 8, scale: 2, default: 0.0 }) // Prix de l'évenement
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // Champs de paiement
  @Column({ type: 'tinyint', default: 0 })
  is_premium: boolean;

  // @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  // paid_amount: number;

  // @Column({ type: 'datetime', nullable: true })
  // payment_date: Date;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Un événement peut être ajouté à 0, 1 ou plusieurs calendriers via la table d'association CalendarEvent
  @OneToMany(() => CalendarEvent, (calendarEvent) => calendarEvent.event)
  calendarEvents: CalendarEvent[];

  @ManyToMany(() => Category, (category) => category.events)
  @JoinTable({
    name: 'event_categories',
    joinColumn: { name: 'event_id', referencedColumnName: 'event_id' },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'category_id',
    },
  })
  categories: Category[];
}
