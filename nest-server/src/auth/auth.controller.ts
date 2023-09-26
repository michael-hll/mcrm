import { Body, Controller, Get, Post, UseGuards, BadRequestException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './current-user.decorator';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService) { }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@CurrentUser() user: User) {
    return {
      id: user.id,
      token: this.authService.getTokenForUser(user)
    }
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  @Serialize(UserDto)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Post('users')
  @Serialize(UserDto)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);

      return user;
    } catch (err) {
      this.logger.error(err);
      let errorMsg = 'Create user failed.';
      if('driverError' in err){
        errorMsg += ' ' + err['driverError']['detail'];
      }
      throw new BadRequestException(errorMsg);
    }
  }
}
