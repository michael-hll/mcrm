import { Body, Controller, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UseAdmin } from 'src/base/decorators/admin.decorator';
import { ModuleClassName } from 'src/base/decorators/module-name.decorator';
import { Name } from 'src/base/decorators/name.decorator';
import { UpdateApiRoleManyDto } from './apis/dtos/update-api-roles.dto';
import { AuthorizationService } from './authorization.service';

@Controller('authorization')
@Name('Authorization')
@ModuleClassName('IamModule')
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
  @UseAdmin()
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
  @UseAdmin()
  async grantApiRoutes(@Body() updateApiRoleManyDto: UpdateApiRoleManyDto) {
    return await this.authorizationService.grantApiRoles(updateApiRoleManyDto); 
  }
}
