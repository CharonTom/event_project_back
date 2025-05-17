// src/calendar/calendar.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('calendars')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @ApiExcludeEndpoint()
  @Post()
  async createCalendar(@Body() user: any) {
    // Pour cet exemple, on passe directement l'utilisateur.
    // En pratique, il faudrait récupérer l'utilisateur via le contexte d'authentification.
    return this.calendarService.createCalendar(user);
  }
}
