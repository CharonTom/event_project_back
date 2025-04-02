import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddEventToCalendarRequestDto } from './dto/add-event-to-calendar.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/enums/role.enum';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

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
  @UseGuards(JwtGuard, RolesGuard)
  @Post(':userId/calendar/events')
  async addEventToCalendar(
    @Param('userId') userId: string,
    @Body() AddEventToCalendarRequestDto: AddEventToCalendarRequestDto,
    @GetUser() currentUser: any,
  ) {
    this.logger.debug(
      `Current user ID: ${currentUser.id}, Requested user ID: ${userId}`,
    );

    // Vérifier que l'utilisateur connecté est bien celui qui possède le calendrier
    if (currentUser.id !== +userId && currentUser.role !== Role.Admin) {
      this.logger.warn(
        `User ${currentUser.id} tried to access calendar of user ${userId}`,
      );
      throw new ForbiddenException(
        'You can only add events to your own calendar',
      );
    }

    return this.usersService.addEventToCalendar(
      +userId,
      AddEventToCalendarRequestDto,
    );
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Delete(':userId/calendar/events/:eventId')
  async removeEventFromCalendar(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
    @GetUser() currentUser: any,
  ): Promise<{ message: string }> {
    this.logger.debug(
      `Current user ID: ${currentUser.id}, Requested user ID: ${userId}`,
    );

    // Vérifier que l'utilisateur connecté est bien celui qui possède le calendrier
    if (currentUser.id !== +userId && currentUser.role !== Role.Admin) {
      this.logger.warn(
        `User ${currentUser.id} tried to access calendar of user ${userId}`,
      );
      throw new ForbiddenException(
        'You can only remove events from your own calendar',
      );
    }

    await this.usersService.removeEventFromCalendar(+userId, +eventId);
    return { message: 'Event removed from calendar successfully' };
  }
}
