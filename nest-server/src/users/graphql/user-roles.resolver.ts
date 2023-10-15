import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from 'src/graphql/graphql-types';
import { RolesByUserLoader } from './data-loader/roles-by-user.loader/roles-by-user.loader';

@Resolver('User')
export class UserRolesResolver {

  constructor(
    private readonly rolesByUserLoader: RolesByUserLoader, 
  ) {}
  
  /**
   * Get roles on demond, this will make performance better
   * @param user 
   * @returns 
   */
  @ResolveField('roles')
  async getRolesOfUser(@Parent() user: GraphQLTypes.User) { 
    // using dataload way the resolve fields will only execute once
    return this.rolesByUserLoader.load(user.id);
  }
}

