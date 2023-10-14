import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Base } from 'src/base/base';
import { RedisModule } from 'src/redis/redis.module';
import { Role } from 'src/roles/entities/role.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './graphql/users.resolver';
import { UserRolesResolver } from './graphql/user-roles.resolver';
import { DateScalar } from './graphql/scalars/date.scalar';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

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
  ],
})
export class UsersModule extends Base {
  getModuleName(): string {
    return 'Users Module';
  }
}
