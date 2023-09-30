import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { CurrentUserData } from 'src/iam/interfaces/current-user-data.interface';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { RoleCodes } from '../enums/role.codes';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /*
    const contextRoles = this.reflector.getAllAndOverride<RoleCodes[]>(ROLES_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ]);
    if(!contextRoles){
      return true;
    }
    const user: CurrentUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];*/
    // TODO: implement general roal guards against each route
    return true;
  }
}
