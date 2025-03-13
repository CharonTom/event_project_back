// src/calendar/calendar.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CalendarEvent } from '../../calendar-event/entities/calendar-event.entity';

@Entity('calendars')
export class Calendar {
  @PrimaryGeneratedColumn()
  calendar_id: number;

  @OneToOne(() => User, (user) => user.calendar, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Le calendrier peut contenir 0, 1 ou plusieurs événements.
  @OneToMany(() => CalendarEvent, (calendarEvent) => calendarEvent.calendar)
  events: CalendarEvent[];
}
