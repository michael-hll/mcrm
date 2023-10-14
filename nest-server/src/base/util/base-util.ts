import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export class BaseUtil {
  public static GetRequestFromContext(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    if(!request){
      const ctx = GqlExecutionContext.create(context)
      return ctx.getContext().req;
    }        
    return request;
  }
}