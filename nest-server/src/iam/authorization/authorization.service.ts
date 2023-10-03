import { Injectable, Logger } from '@nestjs/common';
import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { BaseModule } from 'src/base/base.module';
import { NAME } from 'src/base/decorators/name.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Api } from './apis/entities/api.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorizationService {
  private logger = new Logger(AuthorizationService.name);
  private namedControllers = new Map<string, string>();
  private namedRoutes = new Map<string, any>();
  constructor(
    private readonly discover: DiscoveryService,
    @InjectRepository(Api)
    private readonly apisRepository: Repository<Api>,
  ) { }

  async registerRoutes(sync: boolean = false) {
    const namedControllers = await this.discover.controllersWithMetaAtKey<string>(NAME);
    for (const controller of namedControllers) {
      this.namedControllers.set(
        controller.discoveredClass.parentModule.name + '.' +
        controller.discoveredClass.name,
        controller.meta)
    }
    const namedRoutes = await this.discover.controllerMethodsWithMetaAtKey<string>(NAME);
    let hasErrors = false;
    for (let route of namedRoutes) {
      const parentKey = route.discoveredMethod.parentClass.parentModule.name + '.' +
        route.discoveredMethod.parentClass.name;
      const key = parentKey + '.' + route.discoveredMethod.methodName;
      const moduleName = (route.discoveredMethod.parentClass.parentModule.instance as BaseModule).getModuleName();
      this.namedRoutes.set(
        key,
        {
          parentKey,
          module: route.discoveredMethod.parentClass.parentModule.name,
          module_name: moduleName,
          controller: route.discoveredMethod.parentClass.name,
          controller_name: this.namedControllers.get(parentKey),
          api: route.discoveredMethod.methodName,
          api_name: route.meta
        });

      if (this.namedControllers.has(parentKey)) {
        this.logger.debug(`ROUTE: ${key} => ${moduleName},${this.namedControllers.get(parentKey)},${route.meta}`)
      } else {
        hasErrors = true;
        this.logger.error(`Route '${key} => ${route.meta}' has no parent named controller.`);
      }
    }
    if (!hasErrors && sync) {
      await this.saveRoutes();
    }
  }

  async saveRoutes() {
    let apis: Api[] = [];
    for (let key of this.namedRoutes.keys()) {
      apis.push(new Api({
        key: key,
        module: this.namedRoutes.get(key).module,
        module_name: this.namedRoutes.get(key).module_name,
        controller: this.namedRoutes.get(key).controller,
        controller_name: this.namedRoutes.get(key).controller_name,
        api: this.namedRoutes.get(key).api,
        api_name: this.namedRoutes.get(key).api_name,
      }))
    }

    // prepare data for sync...
    const old_apis = await this.apisRepository
      .createQueryBuilder("a")
      .select(["a.key"])
      .getMany();
    const old_keys = new Set(old_apis.map(api => api.key));
    const same_keys = new Set(
      apis.filter(api => old_keys.has(api.key))
        .map(api => api.key));
    const del_keys = new Set(
      old_apis.filter(api => !same_keys.has(api.key))
        .map(api => api.key)
    );
    const new_apis = apis.filter(api => !old_keys.has(api.key));
    const entities = this.apisRepository.create(apis);

    // start a transaction manager 
    this.apisRepository.manager.transaction(
      async (transactionalEntityManager) => {
        // delete not used apis and relations
        for (let del of del_keys) {
          const api = old_apis.find(api => api.key === del);
          await transactionalEntityManager
            .createQueryBuilder()
            .relation(Api, 'roles')
            .of(api)
            .remove(del);
          await this.apisRepository.remove(api);
        }
        await this.apisRepository.save(entities);
      });
  }
}
