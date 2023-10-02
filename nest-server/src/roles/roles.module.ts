import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { BaseModule } from 'src/base/base.module';
import { NAME } from 'src/base/decorators/name.decorator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role,User]),
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    {
      provide: NAME,
      useValue: 'Roles Module',
    },
  ],
})
export class RolesModule extends BaseModule {}
