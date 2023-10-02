import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/base/interceptors/serialize.interceptor';
import { AdminRoleGuard } from 'src/iam/authorization/guards/admin-role.guard';
import { CurrentUser } from 'src/iam/decorators/current-user.decorator';
import { CurrentUserData } from 'src/iam/interfaces/current-user-data.interface';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Name } from 'src/base/decorators/name.decorator';

@Controller('users')
@Name('Users')
@Serialize(ReturnUserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @Name('Get All')
  @UseGuards(AdminRoleGuard)
  findAll(@CurrentUser() user: CurrentUserData) {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Name('Get One')
  findOne(@Param('id') id: number, @CurrentUser() currentUser: CurrentUserData) {
    return this.usersService.findOne(id, currentUser);
  }

  @Patch(':id')
  @Name('Update')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: CurrentUserData) {
    return this.usersService.update(id, updateUserDto, currentUser);
  }

  @Delete(':id')
  @Name('Delete')
  @UseGuards(AdminRoleGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
