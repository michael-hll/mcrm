import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Name } from 'src/base/decorators/name.decorator';
import { ModuleClassName } from 'src/base/decorators/module-name.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('roles')
@Name('Roles')
@ModuleClassName('RolesModule')
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
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
  update(@Param('code') code: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(code, updateRoleDto);
  }

  @Delete(':code')
  @Name('Delete')
  remove(@Param('code') code: string) {
    return this.rolesService.remove(code.toUpperCase());
  }
}
