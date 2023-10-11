import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Base } from 'src/base/base';
import { RedisModule } from 'src/redis/redis.module';
import { User } from 'src/users/entities/user.entity';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role,User]),
    RedisModule,
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
  ],
})
export class RolesModule extends Base {
  getModuleName(): string {
    return 'Roles Module';
  }
}
