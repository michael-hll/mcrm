import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/redis/redis.module';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { AuthorizationController } from './authorization/authorization.controller';
import { AuthorizationService } from './authorization/authorization.service';
import jwtConfig from './config/jwt.config';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { BaseModule } from 'src/base/base.module';
import { NAME } from 'src/base/decorators/name.decorator';
import { Api } from './authorization/apis/entities/api.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Api]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    RedisModule,
    DiscoveryModule,
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard, 
    },
    /*
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },*/
    {
      provide: NAME,
      useValue: 'Auth Module'
    },
    AccessTokenGuard,
    AuthenticationService,
    AuthorizationService,
  ],
  controllers: [AuthenticationController, AuthorizationController]
})
export class IamModule extends BaseModule {}
