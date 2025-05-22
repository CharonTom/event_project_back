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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { EventsService } from '../events/events.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService,
  ) {}

  // -------------------    Crud basique pour les utilisateurs     -----------------

  @ApiOperation({ summary: 'Récupère la liste de tous les utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs retournée avec succès.',
  })
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Récupère un utilisateur par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur trouvé.',
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Met à jour un utilisateur existant' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour.',
  })
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Supprime un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur supprimé avec succès.',
  })
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // Afficher tous les événements d'un utilisateur
  @ApiOperation({ summary: 'Liste des évenements créer par un utilisateur.' })
  @ApiResponse({
    status: 200,
    description: 'Liste retourner avec succès.',
  })
  @Get(':id/events')
  @Roles(Role.Admin, Role.User)
  async findEventsForUser(@Param('id') id: string) {
    return this.eventsService.findByUser(+id);
  }

  //---------------- Action sur les calendrier de l'utilisateur ---------------
  @ApiOperation({
    summary: "Ajoute un événement au calendrier d'un utilisateur",
  })
  @ApiResponse({ status: 201, description: 'Événement ajouté au calendrier.' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
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

  @ApiOperation({
    summary: "Supprime un événement du calendrier d'un utilisateur",
  })
  @ApiResponse({
    status: 200,
    description: 'Événement supprimé du calendrier.',
  })
  @ApiResponse({
    status: 403,
    description: 'Vous ne pouvez supprimer que sur votre propre calendrier.',
  })
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @Delete(':userId/calendar/events/:eventId')
  async removeEventFromCalendar(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
    @GetUser() currentUser: any,
  ): Promise<{ message: string }> {
    // Vérifier que l'utilisateur connecté est bien celui qui possède le calendrier
    if (currentUser.id !== +userId && currentUser.role !== Role.Admin) {
      throw new ForbiddenException(
        'You can only remove events from your own calendar',
      );
    }

    await this.usersService.removeEventFromCalendar(+userId, +eventId);
    return { message: 'Event removed from calendar successfully' };
  }
}
