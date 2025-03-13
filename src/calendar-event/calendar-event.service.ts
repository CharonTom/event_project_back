// src/calendar-event/calendar-event.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEvent } from './entities/calendar-event.entity';

@Injectable()
export class CalendarEventService {
  constructor(
    @InjectRepository(CalendarEvent)
    private readonly calendarEventRepository: Repository<CalendarEvent>,
  ) {}

  async addEventToCalendar(
    calendarEventData: Partial<CalendarEvent>,
  ): Promise<CalendarEvent> {
    const calendarEvent =
      this.calendarEventRepository.create(calendarEventData);
    return this.calendarEventRepository.save(calendarEvent);
  }

  // Vous pouvez ajouter d'autres méthodes (mise à jour, suppression, etc.)
}
