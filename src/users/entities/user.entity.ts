// src/users/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Calendar } from '../../calendar/entities/calendar.entity';

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
  password: string;

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

  // Un utilisateur peut créer 0, 1 ou plusieurs événements
  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  // Un utilisateur possède obligatoirement un unique calendrier.
  // La propriété cascade permet de créer automatiquement le calendrier associé lors de la création de l'utilisateur
  @OneToOne(() => Calendar, (calendar) => calendar.user, { cascade: true })
  calendar: Calendar;
}
