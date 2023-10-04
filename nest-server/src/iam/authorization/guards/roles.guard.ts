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

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Api)
    private readonly apisRepository: Repository<Api>,) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const error = new UnauthorizedException();
    
    const user: CurrentUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    const userEntity = await this.usersRepository.findOne({ where: {id: user.sub }, relations: ['roles']});
    const userRoles = new Set(userEntity.roles.map(role => role.code));
    const isAdminOnly = this.reflector.get(IS_ADMIN_ONLY, context.getHandler());
    if(isAdminOnly && userRoles.has(RoleCodes.ADMIN)) {
      return true;
    }

    const moduleName = this.reflector.get(MODULE_CLASS_NAME, context.getClass());
    if(!moduleName){
      throw new BadRequestException('Doesnot found the api module name.');
    }
    const apiKey = `${moduleName}.${context.getClass().name}.${context.getHandler().name}`;
    const api = await this.apisRepository.findOne({where: { key: apiKey}, relations: ['roles']});
    if(!api){
      throw new BadRequestException(`Api key '${apiKey}' doesnot exists.`)
    }
    
    const apiRoles = new Set(api.roles.map(role => role.code));
    for(let apiRole of apiRoles){
      if(userRoles.has(apiRole)){
        return true;
      }
    }
    throw error;
  }
}
