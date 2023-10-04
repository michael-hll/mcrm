import { Inject, MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { NAME } from './decorators/name.decorator';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';
import { Base } from './base';

/**
 * Base Module
 */
@Module({
})
export class BaseModule extends Base implements NestModule {

  /**
   * Get module name
   * @returns Module Name
   */
  getModuleName(): string {
    return 'Base Module';
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
