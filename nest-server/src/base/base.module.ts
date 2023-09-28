import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [
    //{provide: APP_GUARD, useClass: ApiKeyGuard}
  ],
})
export class BaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
