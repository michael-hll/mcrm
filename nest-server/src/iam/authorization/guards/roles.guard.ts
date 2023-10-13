import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { MODULE_CLASS_NAME } from 'src/base/decorators/module-name.decorator';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { CurrentUserData } from 'src/iam/interfaces/current-user-data.interface';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Api } from '../apis/entities/api.entity';
import { IS_ADMIN_ONLY } from 'src/base/decorators/admin.decorator';
import { RoleCodes } from '../enums/role.codes';
import { RoleCacheService } from 'src/redis/role/role.cache.service';
import { BaseAuthGuard } from 'src/base/guards/base-auth.guard';

@Injectable()
export class RolesGuard extends BaseAuthGuard {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Api)
    private readonly apisRepository: Repository<Api>,
    private readonly roleCachService: RoleCacheService) { 
      super();
    }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const error = new UnauthorizedException();

    try {
      const user: CurrentUserData = this.getRequest(context)[
        REQUEST_USER_KEY
      ];

      // get current user roles
      const cachedUserRoles = await this.roleCachService.get(user.sub.toString());
      let userRoles: Set<string>;
      if (cachedUserRoles) {
        userRoles = new Set(JSON.parse(cachedUserRoles));
      } else {
        const userEntity = await this.usersRepository.findOne({ where: { id: user.sub }, relations: ['roles'] });
        if (!userEntity) {
          throw error;
        }
        userRoles = new Set(userEntity.roles.map(role => role.code));
        this.roleCachService.set(user.sub.toString(), JSON.stringify(userEntity.roles.map(role => role.code)));
      }

      // check is amdin only role
      const isAdminOnly = this.reflector.get(IS_ADMIN_ONLY, context.getHandler());
      if (isAdminOnly) {
        return userRoles.has(RoleCodes.ADMIN);
      }

      // get api roles
      const moduleName = this.reflector.get(MODULE_CLASS_NAME, context.getClass());
      if (!moduleName) {
        throw new BadRequestException('Doesnot found the api module name.');
      }
      const apiKey = `${moduleName}.${context.getClass().name}.${context.getHandler().name}`;

      // TODO: For graphql type role based security check will find a solution later
      if(apiKey.includes('Resolver')) return true;

      // check user has api access rights
      const cachedApiRoles = await this.roleCachService.get(apiKey);
      let apiRoles: Set<string>;
      if (cachedApiRoles) {
        apiRoles = new Set(JSON.parse(cachedApiRoles));
      } else {
        const api = await this.apisRepository.findOne({ where: { key: apiKey }, relations: ['roles'] });
        if (!api) {
          throw new BadRequestException(`Api key '${apiKey}' doesnot exists.`)
        }
        apiRoles = new Set(api.roles.map(role => role.code));
        this.roleCachService.set(apiKey, JSON.stringify(api.roles.map(role => role.code)));
      }
      for (let apiRole of apiRoles) {
        if (userRoles.has(apiRole)) {
          return true;
        }
      }
    } catch (err) {
      throw err;
    }
    throw error;
  }
}
