import { Body, Controller, Get, Post, UseGuards, BadRequestException, UnauthorizedException, Logger, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './current-user.decorator';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDetailDto } from './dto/user-detail.dto';

@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService) { }

  @Post('signup')
  @Serialize(UserDto)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);

      return user;
    } catch (err) {
      this.logger.error(err);
      let errorMsg = 'Create user failed.';
      if ('driverError' in err) {
        errorMsg += ' ' + err['driverError']['detail'];
      }
      throw new BadRequestException(errorMsg);
    }
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async login(@CurrentUser() user: User) {
    return {
      id: user.id,
      token: this.authService.getTokenForUser(user)
    }
  }

  @Patch('/:id')
  @Serialize(UserDto)
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto, @CurrentUser() user: User){
    try{
      const userId = parseInt(id);
      if(userId !== user.id){
        throw new UnauthorizedException();
      }
      return await this.userService.update(userId, body);
    }catch(err){
      this.logger.error(err);
      let errorMsg = 'Create user failed.';
      if ('driverError' in err) {
        errorMsg += ' ' + err['driverError']['detail'];
      }
      throw new BadRequestException(errorMsg);  
    }    
  }

  @Get('/:id')
  @Serialize(UserDetailDto)
  @UseGuards(AuthGuard('jwt'))
  async findUser(@Param('id') id: string, @CurrentUser() user: User){
    try{
      const userId = parseInt(id);
      if(userId !== user.id){
        throw new UnauthorizedException();
      }
      return await this.userService.findUser(userId);
    }catch(err){
      throw new BadRequestException(err);  
    }    
  }
}
