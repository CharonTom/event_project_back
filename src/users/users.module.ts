// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Calendar } from '../calendar/entities/calendar.entity';
import { Event } from '../events/entities/event.entity';
import { CalendarEvent } from '../calendar-event/entities/calendar-event.entity';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Calendar, Event, CalendarEvent]),
    EventsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
