// src/calendar-event/calendar-event.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CalendarEventService } from './calendar-event.service';

@Controller('calendar-events')
export class CalendarEventController {
  constructor(private readonly calendarEventService: CalendarEventService) {}

  @Post()
  async addEvent(@Body() calendarEventData: any) {
    return this.calendarEventService.addEventToCalendar(calendarEventData);
  }
}
