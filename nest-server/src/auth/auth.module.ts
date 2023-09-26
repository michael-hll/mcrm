import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.Strategy';
import { JwtStrategy } from './strategy/jwt.Strategy';
import { TestMiddleware } from './middleware/test.middlewares';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        signOptions: {
          expiresIn: process.env.AUTH_EXPIRES_IN
        }
      })
    })  
  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes('*');
  }
}
