import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { EventRolesGuard } from '../auth/guards/event-roles.guard'; // Utilise le nouveau guard
import { Public } from 'src/auth/decorators/public.decorator';
import { GetUser } from '../auth/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Créer un nouvel événement' })
  @ApiResponse({ status: 201, description: 'Événement créé avec succès.' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(EventRolesGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/assets', // vers le dossier servi par /assets
        filename: (req, file, callback) => {
          const dateAndRandomNumber =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${dateAndRandomNumber}-${file.originalname}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Seules les images sont autorisées'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: User,
  ) {
    return this.eventsService.create(createEventDto, user, file);
  }

  @ApiOperation({ summary: 'Récupérer la liste de tous les événements' })
  @ApiResponse({ status: 200, description: 'Liste des événements renvoyée.' })
  @Public()
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @ApiOperation({ summary: 'Récupérer un événement par son ID' })
  @ApiResponse({ status: 200, description: 'Événement trouvé et renvoyé.' })
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Mettre à jour un événement existant',
  })
  @ApiResponse({
    status: 200,
    description: 'Événement mis à jour avec succès.',
  })
  @Roles(Role.Admin, Role.User)
  @UseGuards(EventRolesGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/assets',
        filename: (_req, file, cb) => {
          const name = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${name}-${file.originalname}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Seules les images sont autorisées'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(+id, updateEventDto, file);
  }

  @ApiOperation({ summary: 'Supprimer un événement par son ID' })
  @ApiResponse({ status: 200, description: 'Événement supprimé avec succès.' })
  @Roles(Role.Admin, Role.User)
  @UseGuards(EventRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
