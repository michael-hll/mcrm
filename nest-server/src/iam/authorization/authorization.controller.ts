import { Controller, Post, UseGuards } from '@nestjs/common';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { AuthorizationService } from './authorization.service';
import { Name } from 'src/base/decorators/name.decorator';

@Controller('authorization')
@Name('Authorization')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService,
  ) {}

  @Post('register-routes')
  @Name('Register Routes')
  @UseGuards(AdminRoleGuard)
  registerRoutes() {
    this.authorizationService.registerRoutes();
  }
}
