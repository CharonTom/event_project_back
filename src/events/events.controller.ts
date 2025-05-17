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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { EventRolesGuard } from '../auth/guards/event-roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { GetUser } from '../auth/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Crée un nouvel événement' })
  @ApiResponse({
    status: 201,
    description: 'Événement créé avec succès',
  })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(EventRolesGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto, @GetUser() user: User) {
    return this.eventsService.create(createEventDto, user);
  }

  @ApiOperation({ summary: 'Récupère tous les événements publics' })
  @ApiResponse({
    status: 200,
    description: 'Liste des événements',
    isArray: true,
  })
  @Public()
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @ApiOperation({ summary: 'Récupère un événement par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Détails de l’événement',
  })
  @ApiResponse({ status: 404, description: 'Événement non trouvé' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Met à jour un événement existant' })
  @ApiResponse({
    status: 200,
    description: 'Événement mis à jour',
  })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(EventRolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @ApiOperation({ summary: 'Supprime un événement' })
  @ApiResponse({ status: 200, description: 'Événement supprimé avec succès' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(EventRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
