import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../iam.constants';
import { CurrentUserData } from '../interfaces/current-user-data.interface';

export const CurrentUser = createParamDecorator(
  (field: keyof CurrentUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let user: CurrentUserData | undefined = request[REQUEST_USER_KEY];
    if(user){
      user = {sub: user.sub, username: user.username, email: user.email};
    }
    return field ? user?.[field] : user;
  },
);
