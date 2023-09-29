import { Module } from '@nestjs/common';
import { RefreshTokenStorageService } from './refresh-token.storage';

@Module({
  providers: [RefreshTokenStorageService],
  exports: [RefreshTokenStorageService]
})
export class RedisModule {}
