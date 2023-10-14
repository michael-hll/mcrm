import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from 'src/graphql/graphql-types';
import { RolesByUserLoader } from './data-loader/roles-by-user.loader/roles-by-user.loader';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver('User')
export class UserRolesResolver {

  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly rolesByUserLoader: RolesByUserLoader, 
  ) {}
  
  /**
   * Get roles on demond, this will make performance better
   * @param user 
   * @returns 
   */
  @ResolveField('roles')
  async getRolesOfUser(@Parent() user: GraphQLTypes.User) { 
    console.log('get user roles...');
    // using dataload way the resolve fields will only execute once
    //return this.rolesByUserLoader.load(user.id);
    return this.rolesRepository
      .createQueryBuilder('role')
      .innerJoin('role.users', 'users', 'users.id = :userId', {
        userId: user.id,
      })
      .getMany();
  }

}
