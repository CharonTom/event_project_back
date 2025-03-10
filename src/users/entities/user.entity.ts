// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { UserCalendar } from '../../user-calendar/entities/user-calendar.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({
    type: 'enum',
    enum: ['USER', 'ORGANIZER', 'ADMIN'],
    default: 'USER',
  })
  role: 'USER' | 'ORGANIZER' | 'ADMIN';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @OneToMany(() => UserCalendar, (userCalendar) => userCalendar.user)
  calendars: UserCalendar[];
}
