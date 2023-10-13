import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../iam.constants';
import { CurrentUserData } from '../interfaces/current-user-data.interface';
import { BaseUtil } from 'src/base/util/base-util';

export const CurrentUser = createParamDecorator(
  (field: keyof CurrentUserData | undefined, ctx: ExecutionContext) => {
    const request = BaseUtil.GetRequestFromContext(ctx);
    let user: CurrentUserData | undefined = request[REQUEST_USER_KEY];
    if(user){
      user = {sub: user.sub, username: user.username, email: user.email};
    }
    return field ? user?.[field] : user;
  },
);
