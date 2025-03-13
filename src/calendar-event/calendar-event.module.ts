// src/calendar-event/calendar-event.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from './entities/calendar-event.entity';
import { CalendarEventService } from './calendar-event.service';
import { CalendarEventController } from './calendar-event.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent])],
  providers: [CalendarEventService],
  controllers: [CalendarEventController],
  exports: [CalendarEventService],
})
export class CalendarEventModule {}
