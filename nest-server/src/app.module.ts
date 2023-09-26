import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // make the env variables from sub modules
      //ignoreEnvFile: true, // disable load .env file
      envFilePath: '.env',
      expandVariables: true, // this will make you can use existing env key into other keys
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User],
      synchronize: true
    }),
    AuthModule, 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
