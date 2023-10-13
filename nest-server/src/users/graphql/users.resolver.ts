
import { Controller, ParseIntPipe, Post } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModuleClassName } from 'src/base/decorators/module-name.decorator';
import { Name } from 'src/base/decorators/name.decorator';
import { CreateUserInput, User } from 'src/graphql/graphql';
import { CurrentUserData } from 'src/iam/interfaces/current-user-data.interface';
import { UsersService } from '../users.service';
import { CurrentUser } from 'src/iam/decorators/current-user.decorator';

@Resolver()
@ModuleClassName('UsersModule')
@Name('Users')
@Controller('user')
export class UsersResolver {
  constructor(private readonly usersServices: UsersService) { }

  @Query('users')
  @Name('Get All Users using graphql')
  @Post()
  async findAll(): Promise<User[]> {
    return this.usersServices.findAll();
  }

  @Query('user')
  @Name('Get One user by id using graphql')
  @Post()
  async findOne(@Args('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserData): Promise<User> {
    return this.usersServices.findOne(id, user);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) : Promise<User> {
    return null;
  }
}
