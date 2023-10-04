import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { BaseModule } from 'src/base/base.module';
import { NAME } from 'src/base/decorators/name.decorator';
import { Base } from 'src/base/base';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role]),
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
