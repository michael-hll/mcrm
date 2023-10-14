import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import * as GraphQLTypes from 'src/graphql/graphql-types';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';

@Resolver('User')
export class UserRolesResolver {

  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}
  
  /**
   * Get roles on demond, this will make performance better
   * @param user 
   * @returns 
   */
  @ResolveField('roles')
  async getRolesOfUser(@Parent() user: GraphQLTypes.User) { 
    return this.rolesRepository
      .createQueryBuilder('role')
      .innerJoin('role.users', 'users', 'users.id = :userId', {
        userId: user.id,
      })
      .getMany();
  }
}
