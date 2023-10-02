import { Inject, MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { NAME } from './decorators/name.decorator';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';

/**
 * This base module should NOT dependent on any other module
 * Since other modules will extend this base module
 * In order to correctly get module name
 * you should register a NAME in you providers
 */
@Module({
  providers: [
    {
      provide: NAME,
      useValue: BaseModule.MODULE_NAME,
    }
  ]
})
export class BaseModule implements NestModule, OnModuleInit {

  static readonly MODULE_NAME = 'Base Module';

  constructor(
    @Inject(NAME)
    private readonly moduleName: string
  ) { } 
  
  /**
   * Get module name
   * @returns Module Name
   */
  getModuleName(): string {
    return this.moduleName;
  }

  configure(consumer: MiddlewareConsumer) {
    if(this.moduleName === BaseModule.MODULE_NAME){
      consumer.apply(LoggingMiddleware).forRoutes('*');
    }
  }
  
  public async onModuleInit() {}
}
