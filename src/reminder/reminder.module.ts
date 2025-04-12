// src/reminders/reminder.module.ts
import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from '../calendar-event/entities/calendar-event.entity';
import { Event } from '../events/entities/event.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent, Event, User])],
  providers: [ReminderService],
})
export class ReminderModule {}
