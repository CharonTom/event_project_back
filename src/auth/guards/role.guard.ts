import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Si aucune restriction de rôle, accès autorisé
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Utilisateur authentifié via JWT
    const userIdFromParams = parseInt(request.params.id, 10); // ID dans l'URL

    // 🛠 Ajout des logs de debug
    console.log('Utilisateur authentifié :', user);
    console.log('Roles attendus :', roles);
    console.log('Roles utilisateur :', user.roles || user.role);
    console.log('ID utilisateur JWT :', user?.id);
    console.log('ID utilisateur URL :', userIdFromParams);

    // Si l'utilisateur est ADMIN, il peut tout faire
    if (user?.roles?.includes(Role.Admin) || user?.role === Role.Admin) {
      return true;
    }

    // Si l'utilisateur est "user" et veut modifier son propre compte, on autorise
    if (
      (user?.roles?.includes(Role.User) || user?.role === Role.User) &&
      Number(user.id) === userIdFromParams
    ) {
      return true;
    }

    // Sinon, refus d'accès
    return false;
  }
}
