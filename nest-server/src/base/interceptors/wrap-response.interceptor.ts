import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {

  protected getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    if(!request){
      const ctx = GqlExecutionContext.create(context)
      return ctx.getContext().req;
    }    
    return request;
 }
 
  readonly logger = new Logger(WrapResponseInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // TODO: the current logic doesn't work for graphql type
    // need to find a general solution for the graphql type
    if (context['contextType'] && context['contextType'] === 'graphql') {
      return next.handle();;
    }

    const req = this.getRequest(context);
    this.logger.log(`Request ${req.method} ${req.originalUrl}`);
    //return next.handle().pipe(map(data => ({data})));
    return next.handle();
  }
}
