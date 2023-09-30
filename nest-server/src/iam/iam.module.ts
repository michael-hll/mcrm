import { Module } from '@nestjs/common';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';
import { AccessTokenGuard } from './authentication/guards/access-token.guard';
import { RedisModule } from 'src/redis/redis.module';
import { RolesGuard } from './authorization/guards/roles.guard';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    RedisModule,
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService
    },
    /*
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard, 
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },*/
    AccessTokenGuard,
    AuthenticationService,
  ],
  controllers: [AuthenticationController]
})
export class IamModule {}
