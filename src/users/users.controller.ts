import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddEventToCalendarRequestDto } from './dto/add-event-to-calendar.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // -------------------    Crud basique pour les utilisateurs     -----------------

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  //---------------- Action sur les calendrier de l'utilisateur ---------------

  @Post(':userId/calendar/events')
  async addEventToCalendar(
    @Param('userId') userId: string,
    @Body() AddEventToCalendarRequestDto: AddEventToCalendarRequestDto,
  ) {
    return this.usersService.addEventToCalendar(
      +userId,
      AddEventToCalendarRequestDto,
    ); // Appel au service
  }

  @Delete(':userId/calendar/events/:eventId')
  async removeEventFromCalendar(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
  ): Promise<{ message: string }> {
    await this.usersService.removeEventFromCalendar(+userId, +eventId);
    return { message: 'Event removed from calendar successfully' };
  }
}
