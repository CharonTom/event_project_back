import { Injectable } from '@nestjs/common';
import { CreateUserCalendarDto } from './dto/create-user-calendar.dto';
import { UpdateUserCalendarDto } from './dto/update-user-calendar.dto';

@Injectable()
export class UserCalendarService {
  create(createUserCalendarDto: CreateUserCalendarDto) {
    return 'This action adds a new userCalendar';
  }

  findAll() {
    return `This action returns all userCalendar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCalendar`;
  }

  update(id: number, updateUserCalendarDto: UpdateUserCalendarDto) {
    return `This action updates a #${id} userCalendar`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCalendar`;
  }
}
