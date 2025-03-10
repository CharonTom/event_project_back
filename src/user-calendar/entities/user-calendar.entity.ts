// src/user-calendar/user-calendar.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('user_calendar')
export class UserCalendar {
  @PrimaryGeneratedColumn()
  user_calendar_id: number;

  @ManyToOne(() => User, (user) => user.calendars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Event, (event) => event.calendars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  added_at: Date;

  // Rappels
  @Column({ type: 'tinyint', default: 0 })
  wants_reminder: boolean;

  @Column({ type: 'tinyint', default: 0 })
  reminder_7d_sent: boolean;

  @Column({ type: 'datetime', nullable: true })
  reminder_7d_sent_at: Date;

  @Column({ type: 'tinyint', default: 0 })
  reminder_1d_sent: boolean;

  @Column({ type: 'datetime', nullable: true })
  reminder_1d_sent_at: Date;
}
