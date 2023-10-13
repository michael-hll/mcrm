
import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/graphql/graphql';
import { UsersService } from '../users.service';
import { ModuleClassName } from 'src/base/decorators/module-name.decorator';
import { Name } from 'src/base/decorators/name.decorator';
import { Controller, Post } from '@nestjs/common';

@Resolver()
@ModuleClassName('UsersModule')
@Name('Users')
@Controller('user')
export class UsersResolver {
  constructor(private readonly usersServices: UsersService) {}

  @Query('users')
  @Name('Get All Users using graphql')
  @Post()
  async findAll(): Promise<User[]> { 
    return this.usersServices.findAll();
  }

}
