import { Injectable, Logger } from '@nestjs/common';
import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { BaseModule } from 'src/base/base.module';
import { NAME } from 'src/base/decorators/name.decorator';

@Injectable()
export class AuthorizationService {
  private logger = new Logger(AuthorizationService.name);
  private namedControllers = new Map<string, string>();
  private namedRoutes = new Map<string, string[]>();
  constructor(private readonly discover: DiscoveryService) { }

  async registerRoutes() {
    // TODO: save it to the database
    const namedControllers = await this.discover.controllersWithMetaAtKey<string>(NAME);
    for (const controller of namedControllers) {
      this.namedControllers.set(
        controller.discoveredClass.parentModule.name + '.' +
        controller.discoveredClass.name,
        controller.meta)
    }
    const namedRoutes = await this.discover.controllerMethodsWithMetaAtKey<string>(NAME);
    for (let route of namedRoutes) {
      const parentKey = route.discoveredMethod.parentClass.parentModule.name + '.' +
        route.discoveredMethod.parentClass.name;
      const key = parentKey + '.' + route.discoveredMethod.methodName;
      const moduleName = (route.discoveredMethod.parentClass.parentModule.instance as BaseModule).getModuleName();
      this.namedRoutes.set(
        key,
        [parentKey, route.meta, moduleName]);

      if (this.namedControllers.has(parentKey)) {
        this.logger.debug(`ROUTE: ${key} => ${moduleName},${this.namedControllers.get(parentKey)},${route.meta}`)
      } else {
        this.logger.error(`Route '${key} => ${route.meta}' has no parent named controller.`);
      }
    }
  }
}
