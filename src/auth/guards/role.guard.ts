import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Si l'utilisateur est ADMIN, il peut tout faire
    if (user?.role === Role.Admin) {
      return true;
    }

    // Si l'utilisateur a un des rôles requis
    if (roles.includes(user?.role)) {
      // Pour les routes qui nécessitent un ID (modification/suppression)
      if (request.params?.id) {
        // Un utilisateur normal ne peut modifier/supprimer que son propre compte
        return user?.id === +request.params.id;
      }
      return true;
    }

    return false;
  }
}
