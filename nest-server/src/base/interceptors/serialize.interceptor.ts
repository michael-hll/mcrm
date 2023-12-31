import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { plainToInstance } from 'class-transformer';
  
  /**
   * Filter out sensitive dto columns 
   * @param dto 
   * @returns 
   */
  export function Serialize(dto: any) {
    return UseInterceptors(new SerializeInterceptor(dto));
  }
  
  class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
  
    intercept(
      context: ExecutionContext,
      handler: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      // Run something before a request is handled by the request handler
  
      return handler.handle().pipe(
        map((data: any) => {
          // Run something before the response is sent out
          // data is the response from the request handler
          return plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
          });
        }),
      );
    }
  }
  