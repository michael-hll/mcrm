import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/iam/decorators/current-user.decorator';
import { CurrentUserData } from 'src/iam/interfaces/current-user-data.interface';
import { RolesGuard } from 'src/iam/authorization/guards/roles.guard';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll(@CurrentUser() user: CurrentUserData) {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: CurrentUserData) {
    return this.usersService.update(id, updateUserDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
