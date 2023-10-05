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

    /**
     * 
     * @param key 
     * @param value 
     * @param seconds Expired seconds. Default 12 hours, set to 0 means no ex
     * @returns 
     */
    async set(key: string, value: string, seconds: number = 3600 * 12) {
        if (seconds === 0) {
            return await this.redisClient.set(key, value, 'NX');
        } else {
            return await this.redisClient.set(key, value, 'EX', seconds);
        }
    }

    async del(key: string) {
        return await this.redisClient.del(key);
    }

    async keys(pattern: string) {
        return await this.redisClient.keys(pattern);
    }

    async findAll() {
        const keys = await this.redisClient.keys('*');
        const values = [];
        for(let key of keys){
            let value = await this.redisClient.get(key);
            values.push({key, value});
        }
        return values;
    }
}
