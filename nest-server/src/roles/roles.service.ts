import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleCodes } from 'src/iam/authorization/enums/role.codes';
import { RoleCacheService } from 'src/redis/role/role.cache.service';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly roleCacheService: RoleCacheService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    
    if(await this.rolesRepository.exist({where: {code: createRoleDto.code}})){
      throw new BadRequestException(`Role '${createRoleDto.code}' already exists.`);
    };
    const role = this.rolesRepository.create({...createRoleDto});
    return await this.rolesRepository.save(role);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  findOne(code: string) {
    const role = this.rolesRepository.findOne({where: { code: code.toUpperCase() }});
    if(!role){
      throw new NotFoundException('Role doesnot exists.');
    }
    return role;
  }

  async update(code: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.findOne({where: { code: code.toUpperCase() }});
    if(!role){
      throw new NotFoundException('Role doesnot exists.');
    }
    Object.assign(role, updateRoleDto);
    return await this.rolesRepository.save(role);
  }

  async remove(code: string) {
    if(code === RoleCodes.ADMIN || code === RoleCodes.DEFAULT ){
      throw new BadRequestException(`Role '${code}' is not allowed to delete.`);
    }
    const role = await this.rolesRepository.findOne({
      where: { code },
      relations: {
        users: true
      }});
    if(!role){
      throw new NotFoundException('Role doesnot exists.');
    }
    const userRelations = role.users.map(user => user.id);
    await this.rolesRepository.manager.transaction(
      async (transactionalEntityManager) => {
        // delete linked users
        await transactionalEntityManager
          .createQueryBuilder()
          .relation(Role, 'users')
          .of(role).remove(userRelations);

        // delete role
        await transactionalEntityManager.remove(role);
      }).catch((err) => {
        this.logger.error('delete role failed with error: ', err);
        throw new BadRequestException(`Delete user failed with error: ${err.message}`);
      })
    // remove all linked roles from cache
    this.roleCacheService.delRole(code);
    return true;
  }
}
