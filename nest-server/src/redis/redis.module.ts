import { Module } from '@nestjs/common';
import { Base } from 'src/base/base';
import { RedisService } from './redis.service';
import { RoleCacheService } from './role/role.cache.service';
import { RefreshTokenCacheService } from './token/refresh-token.cache.service';
import { RedisController } from './redis.controller';

@Module({
  imports: [
  ],
  providers: [
    RefreshTokenCacheService, 
    RoleCacheService,
    RedisService,
  ],
  exports: [
    RefreshTokenCacheService,
    RoleCacheService,
  ],
  controllers: [RedisController]
})
export class RedisModule extends Base{
  getModuleName(): string {
    return 'Redis Module';
  }
}
