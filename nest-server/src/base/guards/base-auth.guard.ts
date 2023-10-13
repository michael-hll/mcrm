import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { BaseUtil } from "../util/base-util";

export abstract class BaseAuthGuard implements CanActivate {
  abstract canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;

  protected getRequest(context: ExecutionContext) {
    return BaseUtil.GetRequestFromContext(context);    
 }
}