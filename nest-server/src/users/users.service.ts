import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityOperations } from 'src/base/enum/entity-operations.enum';
import { CurrentUserData } from 'src/iam/interfaces/current-user-data.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepositories: Repository<User>,
  ) { }

  async findAll() {
    return await this.usersRepositories.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepositories.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User doesnot exists.')
    }
    return user;
  }

  /**
   * Update user except password
   */
  async update(id: number, updateUserDto: UpdateUserDto, currentUser: CurrentUserData) {

    // only current user itself can update
    if (id !== currentUser.sub) {
      throw new UnauthorizedException();
    }
    let user = await this.usersRepositories.findOne({
      where: { id }
    });
    if (!user) {
      throw new NotFoundException('User doesnot exists.')
    }
    // Update user role relations
    let addRoles: string[];
    let delRoles: string[];
    if (updateUserDto.roles) {
      addRoles = updateUserDto.roles
        .filter(role => role.operation === EntityOperations.CREATE)
        .map(role => role.code);
      delRoles = updateUserDto.roles
        .filter(role => role.operation === EntityOperations.DELETE)
        .map(role => role.code);
    }
    await this.usersRepositories.manager.transaction(
      async (transactionalEntityManager) => {
        // update roles
        await transactionalEntityManager
          .createQueryBuilder()
          .relation(User, 'roles')
          .of(user)
          .addAndRemove(addRoles, delRoles);

        // update user
        const { roles, ...newUserProps } = updateUserDto;
        Object.assign(user, newUserProps)
        await transactionalEntityManager.save(user);
    });

    return true;
  }

  async remove(id: number) {
    let user = await this.usersRepositories.findOne({
      where: { id }
    });
    if (!user) {
      throw new NotFoundException('User doesnot exists.')
    }

    await this.usersRepositories.manager.transaction(
      async (transactionalEntityManager) => {
        // delete roles
        await transactionalEntityManager
          .createQueryBuilder()
          .relation(User, 'roles')
          .of(user)
          .remove(id);

        // delete user
        await transactionalEntityManager.remove(user);
    });
    return true;
  }
}
