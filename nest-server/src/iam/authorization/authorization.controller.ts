import { Body, Controller, Logger, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { AuthorizationService } from './authorization.service';
import { Name } from 'src/base/decorators/name.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UpdateApiRoleManyDto } from './apis/dtos/update-api-roles.dto';
import { UpdateApiRoleDto } from './apis/dtos/update-api-role.dto';

@Controller('authorization')
@Name('Authorization')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService,
  ) {}

  /**
   * Generate current restful apis and save them into apis table
   * The api keys exists from database but not exist from current system will be removed
   * @param sync Only set to 'true' the sync result will be saved into database
   */
  @Post('register-routes')
  @Name('Register Routes')
  @UseGuards(AdminRoleGuard)
  registerRoutes(@Query('sync') sync: boolean) {
    this.authorizationService.registerRoutes(sync);
  }

  /**
   * Maintain each api roles
   * @param updateApiRoleManyDto 
   * @returns 
   */
  @Patch('api-roles')
  @Name('Maintain Api Roles')
  @UseGuards(AdminRoleGuard)
  async grantApiRoutes(@Body() updateApiRoleManyDto: UpdateApiRoleManyDto) {
    return await this.authorizationService.grantApiRoles(updateApiRoleManyDto); 
  }
}
