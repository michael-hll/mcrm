import { Injectable, Logger, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnApplicationBootstrap, OnApplicationShutdown {
    private readonly logger = new Logger(RedisService.name);
    private redisClient: Redis;  
    
    onApplicationBootstrap() {
        this.redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT
        });
    }
    
    onApplicationShutdown(signal?: string) {
        return this.redisClient.quit();
    }

    async get(key: string): Promise<string> {
        return await this.redisClient.get(key);
    }

    async set(key: string, value: string) {
        return await this.redisClient.set(key, value);
    }

    async del(key: string) {
        return await this.redisClient.del(key);
    }
}
