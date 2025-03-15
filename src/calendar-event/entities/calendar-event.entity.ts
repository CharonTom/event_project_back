// src/calendar-event/calendar-event.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Calendar } from '../../calendar/entities/calendar.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('calendar_events')
export class CalendarEvent {
  @PrimaryGeneratedColumn()
  calendar_event_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  added_at: Date;

  // Champs de rappel
  @Column({ type: 'boolean', default: false })
  wants_reminder: boolean;

  @Column({ type: 'boolean', default: false })
  reminder_7d_sent: boolean;

  @Column({ type: 'datetime', nullable: true })
  reminder_7d_sent_at: Date;

  @Column({ type: 'boolean', default: false })
  reminder_1d_sent: boolean;

  @Column({ type: 'datetime', nullable: true })
  reminder_1d_sent_at: Date;

  @ManyToOne(() => Calendar, (calendar) => calendar.events, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'calendar_id' })
  calendar: Calendar;

  @ManyToOne(() => Event, (event) => event.calendarEvents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
