import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...createUserDto,
      password: await this.authService.hashPassword(createUserDto.password)
    });
    return await this.userRepository.save(user);
  }

  public async update(id: number, attrs: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }

  public async findUser(id: number) {
    return await this.userRepository.findOne({where: {id}});
  }
}
