// src/calendar/calendar.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendar } from './entities/calendar.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private readonly calendarRepository: Repository<Calendar>,
  ) {}

  async createCalendar(user: any): Promise<Calendar> {
    const calendar = this.calendarRepository.create({ user });
    return this.calendarRepository.save(calendar);
  }

  async findByUser(user: any): Promise<Calendar> {
    return this.calendarRepository.findOne({ where: { user } });
  }
}
