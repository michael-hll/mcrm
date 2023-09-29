import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RefreshTokenStorageService implements OnApplicationBootstrap, OnApplicationShutdown {

    private readonly KEY_PREFIX = 'TOKEN';
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

    async insert(key: string, tokenId: string): Promise<void> {
        await this.redisClient.set(this.getKey(key), tokenId);
    }

    async validate(key: string, tokenId: string): Promise<boolean> {
        const storedId = await this.redisClient.get(this.getKey(key));
        return storedId === tokenId;
    }

    async invalidate(key: string): Promise<void> {
        await this.redisClient.del(this.getKey(key));
    }

    private getKey(key: string): string { 
        return `${this.KEY_PREFIX}-${key}`;
    }
}

