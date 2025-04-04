import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';

@Injectable()
export class EventRolesGuard implements CanActivate {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Récupère les rôles autorisés définis via un décorateur sur le handler (s'il existe)
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Si aucun ID n'est fourni dans la route (ex: création d'un événement),
    // on vérifie uniquement que l'utilisateur possède le bon rôle (si besoin)
    if (!request.params?.id) {
      if (roles && !roles.includes(user?.role)) {
        throw new ForbiddenException(
          "Vous n'êtes pas autorisé à accéder à cet événement.",
        );
      }
      return true;
    }

    // L'ID est fourni, on tente de le convertir en nombre
    const eventId = +request.params.id;
    if (isNaN(eventId)) {
      throw new ForbiddenException(
        `ID d'événement invalide: ${request.params.id}`,
      );
    }
    // console.log('loguser', user, 'logevent', eventId);

    // Charge l'événement avec sa relation "user"
    const event = await this.eventRepository.findOne({
      where: { event_id: eventId },
      relations: ['user'],
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    // Si l'utilisateur est ADMIN, il a tous les droits
    if (user?.role === Role.Admin) {
      return true;
    }

    // Si des rôles sont définis sur le handler, on vérifie que l'utilisateur en fait partie
    if (roles) {
      if (!roles.includes(user?.role)) {
        throw new ForbiddenException(
          "Vous n'êtes pas autorisé à accéder à cet événement.",
        );
      }
      // Vérifie que l'utilisateur est bien le propriétaire de l'événement
      if (event.user.user_id !== user.id) {
        throw new ForbiddenException(
          "Vous n'êtes pas autorisé à accéder à cet événement.",
        );
      }
      return true;
    }

    // Fallback : vérification d'appartenance
    if (event.user.user_id !== user.id) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à accéder à cet événement.",
      );
    }

    return true;
  }
}
