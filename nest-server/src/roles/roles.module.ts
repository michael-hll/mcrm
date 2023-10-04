import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseModule } from 'src/base/base.module';
import { NAME } from 'src/base/decorators/name.decorator';
import { Base } from 'src/base/base';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role,User]),
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
  ],
})
export class RolesModule extends Base {
  getModuleName(): string {
    return 'Rolse Module';
  }
}
