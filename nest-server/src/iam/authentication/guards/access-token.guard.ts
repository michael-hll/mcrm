import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BaseAuthGuard } from 'src/base/guards/base-auth.guard';

@Injectable()
export class AccessTokenGuard extends BaseAuthGuard {

  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>,
  ){
    super();
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = this.getRequest(context);
    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException(); 
    }
    try{
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfigurations,
      )
      request[REQUEST_USER_KEY] = payload;
      console.log(request.user);
    }catch(err){
      throw new UnauthorizedException(err);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
