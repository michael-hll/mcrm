import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  readonly logger = new Logger(WrapResponseInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    this.logger.log(`Request ${req.method} ${req.originalUrl}`);
    return next.handle().pipe(map(data => ({data})));
  }
}
