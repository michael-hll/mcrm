import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AdminRoleGuard } from 'src/iam/authorization/guards/admin-role.guard';
import { Name } from 'src/base/decorators/name.decorator';

@Controller('roles')
@Name('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(AdminRoleGuard)
  @Name('Create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Name('Get All')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':code')
  @Name('Get One')
  findOne(@Param('code') code: string) {
    return this.rolesService.findOne(code);
  }

  @Patch(':code')
  @Name('Update')
  @UseGuards(AdminRoleGuard)
  update(@Param('code') code: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(code, updateRoleDto);
  }

  @Delete(':code')
  @Name('Delete')
  @UseGuards(AdminRoleGuard)
  remove(@Param('code') code: string) {
    return this.rolesService.remove(code.toUpperCase());
  }
}
