import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
      ) {}
    
      @Post()
      async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);
    
        return {
          ...user,
          token: this.authService.getTokenForUser(user),
        };
      }
}
