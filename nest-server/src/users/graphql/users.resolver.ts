
import { Controller, ParseIntPipe, Post } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModuleClassName } from 'src/base/decorators/module-name.decorator';
import { Name } from 'src/base/decorators/name.decorator';
import * as GraphQLTypes from 'src/graphql/graphql-types';
import { CurrentUserData } from 'src/iam/interfaces/current-user-data.interface';
import { UsersService } from '../users.service';
import { CurrentUser } from 'src/iam/decorators/current-user.decorator';
import { UpdateUserGqlDto } from './dto/update-user-gql.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Resolver()
@ModuleClassName('UsersModule')
@Name('Users')
@Controller('user')
export class UsersResolver {
  constructor(private readonly usersServices: UsersService) { }

  @Query('users')
  @Name('Get All Users using graphql')
  @Post()
  async findAll(): Promise<GraphQLTypes.User[]> {
    return this.usersServices.findAll();
  }

  @Query('user')
  @Name('Get One user by id using graphql')
  @Post()
  async findOne(@Args('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserData): Promise<GraphQLTypes.User> {
    return this.usersServices.findOne(id, user);
  }

  @Mutation('updateUser')
  @Name('Update User with graphql')
  @Post()
  async update(
    @CurrentUser() user: CurrentUserData,
    @Args('id', ParseIntPipe) id: number,    
    @Args('updateUserInput') updateUserInput: UpdateUserGqlDto,
  ): Promise<GraphQLTypes.User> {
    /** Update user properties and roles should be seperated to different apis, since they have differeny execution rights
     * Here is just an example of graphql update mutation with sub tables here...
     * And the roles update doesnot work here using the userServices.update method (this method only update user properties without roles)
     * Instead, to update roles should call userServices.updateRoles method.
     */
    const savedUser = await this.usersServices.update(id, {...updateUserInput} as UpdateUserDto, user);
    return {...savedUser} as GraphQLTypes.User;  
  }
}
