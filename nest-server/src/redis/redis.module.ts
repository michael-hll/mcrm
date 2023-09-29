import { Module } from '@nestjs/common';
import { RefreshTokenStorageService } from './token/refresh-token.storage';
import { RedisService } from './redis.service';

@Module({
  providers: [RefreshTokenStorageService, RedisService],
  exports: [RefreshTokenStorageService]
})
export class RedisModule {}
