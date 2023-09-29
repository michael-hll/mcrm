import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from './base/base.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { IamModule } from './iam/iam.module';
import { RedisModule } from './redis/redis.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // make the env variables from sub modules
      //ignoreEnvFile: true, // disable load .env file
      envFilePath: ['.env'],
      expandVariables: true, // this will make you can use existing env key into other keys
      //ignoreEnvFile: true, // set this to true is needed when deploy to production
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_NAME: Joi.required(),
        DATABASE_USER: Joi.required(),
        DATABASE_PASSWORD: Joi.required(),
        JWT_SECRET: Joi.required(),
        JWT_TOKEN_AUDIENCE: Joi.required(),
        JWT_TOKEN_ISSUER: Joi.required(),
        JWT_ACCESS_TOKEN_TTL: Joi.required(),
        JWT_REFRESH_TOKEN_TTL: Joi.required(),
        REDIS_HOST: Joi.required(),
        REDIS_PORT: Joi.required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => (
        {
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          autoLoadEntities: true,
          synchronize: true
        })
    }),
    BaseModule,
    UsersModule,
    RolesModule,
    IamModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
