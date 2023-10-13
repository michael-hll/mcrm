import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";

export abstract class BaseAuthGuard implements CanActivate {
  abstract canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;

  protected getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    if(!request){
      const ctx = GqlExecutionContext.create(context)
      return ctx.getContext().req;
    }    
    return request;
 }
}