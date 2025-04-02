import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddEventToCalendarRequestDto } from './dto/add-event-to-calendar.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // -------------------    Crud basique pour les utilisateurs     -----------------

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  //---------------- Action sur les calendrier de l'utilisateur ---------------

  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
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

  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Delete(':userId/calendar/events/:eventId')
  async removeEventFromCalendar(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
  ): Promise<{ message: string }> {
    await this.usersService.removeEventFromCalendar(+userId, +eventId);
    return { message: 'Event removed from calendar successfully' };
  }
}
