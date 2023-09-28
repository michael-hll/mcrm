import { Injectable, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.ts/user/user';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';

@Injectable()
export class CustomFactory {
  constructor(){}
  getValue() {
    return "Im a value from custom factory."
  }

  async getValueAsync(): Promise<string> {
    return "Im a value from a async method."
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  providers: [
    UserService,
    CustomFactory,
    {provide: "VALUE_01", useValue: {value: "Im value 01."}},
    {provide: "FACTORY_01", useFactory: () => ({value: "Im factory 01."})},
    {provide: "FACTORY_02",
     useFactory: (factory: CustomFactory) => factory.getValue(),
     inject: [CustomFactory],
    },
    {
      provide: "FACTORY_03",
      useFactory: async (conn: CustomFactory): Promise<string> => {
        const ret = await conn.getValueAsync();
        console.log("async customer factory injected")
        return ret;
      },
      inject: [CustomFactory]
    }
  ],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
