import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCalendarService } from './user-calendar.service';
import { CreateUserCalendarDto } from './dto/create-user-calendar.dto';
import { UpdateUserCalendarDto } from './dto/update-user-calendar.dto';

@Controller('user-calendar')
export class UserCalendarController {
  constructor(private readonly userCalendarService: UserCalendarService) {}

  @Post()
  create(@Body() createUserCalendarDto: CreateUserCalendarDto) {
    return this.userCalendarService.create(createUserCalendarDto);
  }

  @Get()
  findAll() {
    return this.userCalendarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCalendarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserCalendarDto: UpdateUserCalendarDto) {
    return this.userCalendarService.update(+id, updateUserCalendarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCalendarService.remove(+id);
  }
}
