import { Module } from '@nestjs/common';
import { RefreshTokenStorageService } from './token/refresh-token.storage.service';
import { RedisService } from './redis.service';
import { NAME } from 'src/base/decorators/name.decorator';
import { BaseModule } from 'src/base/base.module';
import { Base } from 'src/base/base';

@Module({
  imports: [
  ],
  providers: [
    RefreshTokenStorageService, 
    RedisService,
  ],
  exports: [RefreshTokenStorageService]
})
export class RedisModule extends Base{
  getModuleName(): string {
    return 'Redis Module';
  }
}
