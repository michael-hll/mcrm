
import { Controller, ParseIntPipe, Post } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModuleClassName } from 'src/base/decorators/module-name.decorator';
import { Name } from 'src/base/decorators/name.decorator';
import * as GraphQLTypes from 'src/graphql/graphql-types';
import { CurrentUserData } from 'src/iam/interfaces/current-user-data.interface';
import { UsersService } from '../users.service';
import { CurrentUser } from 'src/iam/decorators/current-user.decorator';
import { UpdateUserGqlDto } from './dto/update-user-gql.dto';

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
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserGqlDto,
  ): Promise<GraphQLTypes.User> {
    console.log(id, updateUserInput);
    return null;
  }
}
