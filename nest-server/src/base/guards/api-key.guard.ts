import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/base/decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPulbic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if(isPulbic){
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const requestHeader = request.header('Authorization');
    return requestHeader === this.configService.get('API_KEY');
  }
}
