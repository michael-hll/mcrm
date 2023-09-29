import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../iam.constants';
import { CurrentUserData } from '../interfaces/active-user-data.interface';

export const CurrentUser = createParamDecorator(
  (field: keyof CurrentUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let user: CurrentUserData | undefined = request[REQUEST_USER_KEY];
    user = {sub: user.sub, email: user.email };
    return field ? user?.[field] : user;
  },
);
