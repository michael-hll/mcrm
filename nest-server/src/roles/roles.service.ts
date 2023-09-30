import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.rolesRepository.create({...createRoleDto});
    return await this.rolesRepository.save(role);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  findOne(code: string) {
    const role = this.rolesRepository.findOne({where: { code: code.toUpperCase() }});
    if(!role){
      throw new NotFoundException('Role doesnot exists.');
    }
    return role;
  }

  async update(code: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.findOne({where: { code: code.toUpperCase() }});
    if(!role){
      throw new NotFoundException('Role doesnot exists.');
    }
    Object.assign(role, updateRoleDto);
    return await this.rolesRepository.save(role);
  }

  async remove(code: string) {
    const role = await this.rolesRepository.findOne({where: { code: code.toUpperCase() }});
    if(!role){
      throw new NotFoundException('Role doesnot exists.');
    }
    return await this.rolesRepository.remove(role);
  }
}
