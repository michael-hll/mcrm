import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Base } from 'src/base/base';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';
import { RedisModule } from 'src/redis/redis.module';
import { Role } from 'src/roles/entities/role.entity';
import { User } from './entities/user.entity';
import { DateScalar } from './graphql/scalars/date.scalar';
import { UserRolesResolver } from './graphql/user-roles.resolver';
import { UsersResolver } from './graphql/users.resolver';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesByUserLoader } from './graphql/data-loader/roles-by-user.loader/roles-by-user.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    RedisModule,
    PubSubModule,    
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersResolver,
    UserRolesResolver,
    DateScalar,
    RolesByUserLoader,
  ],
})
export class UsersModule extends Base {
  getModuleName(): string {
    return 'Users Module';
  }
}
