import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AdminRoleGuard } from 'src/iam/authorization/guards/admin-role.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(AdminRoleGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.rolesService.findOne(code);
  }

  @Patch(':code')
  @UseGuards(AdminRoleGuard)
  update(@Param('code') code: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(code, updateRoleDto);
  }

  @Delete(':code')
  @UseGuards(AdminRoleGuard)
  remove(@Param('code') code: string) {
    return this.rolesService.remove(code.toUpperCase());
  }
}
