import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Name } from 'src/base/decorators/name.decorator';
import { ApiAcceptedResponse, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';

@Auth(AuthType.None)
@Controller('authentication')
@Name('Authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  /**
   * Create one ADMIN role and one DEFAULT role
   * Create one user with both ADMIN role and DEFAULT role
   * email: admin@test.com
   * password: Password123
   * @returns 
   */
  @Post('init')
  @Name('Initialize User/Roles')
  @ApiAcceptedResponse({description: `
  * Create one ADMIN role and one DEFAULT role
  * Create one user with both ADMIN role and DEFAULT role
  * email: admin@test.com
  * password: Password123`})
  init() {
    return this.authService.init();
  }
  
  @Post('sign-up')
  @Name('Sign Up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @Name('Sign In')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.singIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  @Name('Refresh Tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
