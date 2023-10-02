import { Module } from '@nestjs/common';
import { RefreshTokenStorageService } from './token/refresh-token.storage.service';
import { RedisService } from './redis.service';
import { NAME } from 'src/base/decorators/name.decorator';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
  ],
  providers: [
    RefreshTokenStorageService, 
    RedisService,
    {
      provide: NAME,
      useValue: 'Redis Module',
    }
  ],
  exports: [RefreshTokenStorageService]
})
export class RedisModule extends BaseModule{}
