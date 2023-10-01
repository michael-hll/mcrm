import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/base/interceptors/serialize.interceptor';
import { AdminRoleGuard } from 'src/iam/authorization/guards/admin-role.guard';
import { CurrentUser } from 'src/iam/decorators/current-user.decorator';
import { CurrentUserData } from 'src/iam/interfaces/current-user-data.interface';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(ReturnUserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseGuards(AdminRoleGuard)
  findAll(@CurrentUser() user: CurrentUserData) {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number, @CurrentUser() currentUser: CurrentUserData) {
    return this.usersService.findOne(id, currentUser);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: CurrentUserData) {
    return this.usersService.update(id, updateUserDto, currentUser);
  }

  @Delete(':id')
  @UseGuards(AdminRoleGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
