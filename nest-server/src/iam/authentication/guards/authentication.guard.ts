import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from 'src/iam/authorization/guards/roles.guard';
import { AUTH_TYPE_KEY } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<AuthType, CanActivate | CanActivate[]>
    = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly rolesGuard: RolesGuard,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    // TODO: the current auth doesn't work for graphql type
    // need to find a general solution for the graphql type
    if (context['contextType'] && context['contextType'] === 'graphql') {
      return true;
    }

    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];
    if (authTypes.indexOf(AuthType.None) >= 0) return true;
    console.log('access-token guard:', context, Object.keys(context), typeof context['contextType']);
    const guards = authTypes.map(type => this.authTypeGuardMap[type]).flat();
    let error = new UnauthorizedException();
    let authPass = false;
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context)
      ).catch(err => { error = err; });
      if (canActivate) {
        authPass = true;
      }
    }

    // check roles guard
    if (authPass) {
      const canActivate = await Promise.resolve(
        this.rolesGuard.canActivate(context)
      ).catch(err => { error = err; });
      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
