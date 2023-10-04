import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Base } from 'src/base/base';
import { RedisModule } from 'src/redis/redis.module';
import { Role } from 'src/roles/entities/role.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role]),
    RedisModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
  ],
})
export class UsersModule extends Base {
  getModuleName(): string {
    return 'Users Module';
  }
}
