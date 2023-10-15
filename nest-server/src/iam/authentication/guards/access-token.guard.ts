import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BaseAuthGuard } from 'src/base/guards/base-auth.guard';
import jwtConfig from 'src/iam/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';

@Injectable()
export class AccessTokenGuard extends BaseAuthGuard {

  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>,
  ) {
    super();
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = this.getRequest(context);
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfigurations,
      )
      request[REQUEST_USER_KEY] = payload;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (request["Authorization"]) {
      // For graphql subscription case
      const [_, token] = request["Authorization"].split(' ') ?? [];
      return token;
    }
    // For restful api and graphql query
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
