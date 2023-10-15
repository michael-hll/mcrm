import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable({scope: Scope.REQUEST})
export class RolesByUserLoader extends DataLoader<number, Role[]> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(keys => this.batchLoadFn(keys));
  }

  private async batchLoadFn(userIds: readonly number[]): Promise<Role[][]> {
    const userWithRoles = await this.userRepository.find({
      select: ['id'],
      relations: {
        roles: true,
      },
      where: {
        id: In(userIds as number[])
      },
    });
    return userWithRoles.map(user => user.roles);
  }
}
