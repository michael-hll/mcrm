import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepositories: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepositories.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepositories.findOne({where: {id}}); 
    if(!user){
      throw new NotFoundException('User doesnot exists.')
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto.roles);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
