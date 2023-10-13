import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityOperations } from 'src/base/enum/entity-operations.enum';
import { CurrentUserData } from 'src/iam/interfaces/current-user-data.interface';
import { Role } from 'src/roles/entities/role.entity';
import { RoleCodes } from 'src/iam/authorization/enums/role.codes';
import { RoleCacheService } from 'src/redis/role/role.cache.service';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly usersRepositories: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepositories: Repository<Role>,
    private readonly roleCacheService: RoleCacheService,
  ) { }

  async findAll() {
    return await this.usersRepositories.find({
      relations: {roles: true}
    });
  }

  async findOne(id: number, currentUser: CurrentUserData) {
    if(id !== currentUser.sub){
      throw new UnauthorizedException('You cannot view other user details information.');
    }
    const user = await this.usersRepositories.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User doesnot exists.')
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, currentUser: CurrentUserData) {
    // only current user itself can update
    if (id !== currentUser.sub) {
      throw new UnauthorizedException('Current login user isnot match with updated user.');
    }
    let user = await this.usersRepositories.findOne({
      where: { id }
    });
    if (!user) {
      throw new NotFoundException('User doesnot exists.')
    }
    Object.assign(user, updateUserDto);
    await this.usersRepositories.save(user);
    return true;
  }

  /**
   * Update user except password
   */
  async updateRoles(id: number, updateUserRolesDto: UpdateUserRolesDto) {
    this.logger.debug(JSON.stringify(updateUserRolesDto));
    // only current user itself can update
    let user = await this.usersRepositories.findOne({
      where: { id }
    });
    if (!user) {
      throw new NotFoundException('User doesnot exists.')
    }
    // Update user role relations
    let addRoles: string[] = [];
    let delRoles: string[] = [];
    if (updateUserRolesDto.roles) {
      addRoles = updateUserRolesDto.roles
        .filter(role => role.operation === EntityOperations.CREATE)
        .map(role => role.code) ?? [];
      delRoles = updateUserRolesDto.roles
        .filter(role => role.operation === EntityOperations.DELETE)
        .map(role => role.code) ?? [];
    }
    // skip added roles already exists
    if (addRoles.length > 0) {
      const existingRoles = await this.usersRepositories
        .createQueryBuilder()
        .relation(User, 'roles')
        .of(user)
        .loadMany();
      const roleSet = new Set(existingRoles.map(role => role.code));
      addRoles = addRoles.filter(code => !roleSet.has(code));
    }
    // check new role exists for better error message
    for(const r of addRoles){
      const exists = await this.rolesRepositories.exist({where: {code: r}});
      if(!exists){
        throw new NotFoundException(`Role '${r}' doesnot exists.`);
      }
    }
    // cannot remove DEFAULT role for a user
    for(const r of delRoles){
      if(r === RoleCodes.DEFAULT){
        throw new BadRequestException(`Role '${r}' is not allowed to delete.`)
      }
    }
    // start a transaction to update user role relations and user properties
    await this.usersRepositories.manager.transaction(
      async (transactionalEntityManager) => {
        // update roles
        await transactionalEntityManager
          .createQueryBuilder()
          .relation(User, 'roles')
          .of(user)
          .addAndRemove(addRoles, delRoles);
      }).catch((err) => {
        this.logger.error('update user failed with error: ', err);
        throw new BadRequestException(`Update user failed with error: ${err.message}`);
      })
    
    // clear current user roles from cache
    this.roleCacheService.del(id.toString());
    return true;
  }

  async remove(id: number) {
    let user = await this.usersRepositories.findOne({
      where: { id }
    });
    if (!user) {
      throw new NotFoundException('User doesnot exists.')
    }
    this.usersRepositories.manager.transaction(
      async (transactionalEntityManager) => {
        // delete roles
        await transactionalEntityManager
          .createQueryBuilder()
          .relation(User, 'roles')
          .of(user)
          .remove(id);

        // delete user
        await transactionalEntityManager.remove(user);
      }).catch((err) => {
        this.logger.error('delete user failed with error: ', err);
        throw new BadRequestException(`Delete user failed with error: ${err.message}`);
      })
    // clear current user roles from cache
    this.roleCacheService.del(id.toString());
    return true;
  }
}
