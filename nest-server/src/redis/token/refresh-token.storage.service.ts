import { Injectable, Logger } from "@nestjs/common";
import { InvalidRefreshTokenError } from "./invalid-refresh-token-error";
import { RedisService } from "../redis.service";

@Injectable()
export class RefreshTokenStorageService {
    private readonly logger = new Logger(RefreshTokenStorageService.name);
    private readonly KEY_PREFIX = '$TOKEN$';  
    
    constructor(
        private readonly redisService: RedisService
    ) { }    

    async insert(key: string, tokenId: string): Promise<void> {
        await this.redisService.set(this.getKey(key), tokenId);
    }

    async validate(key: string, tokenId: string): Promise<boolean> {
        const storedId = await this.redisService.get(this.getKey(key));
        if(storedId !== tokenId){
            throw new InvalidRefreshTokenError();
        }
        return storedId === tokenId;
    }

    async invalidate(key: string): Promise<void> {
        await this.redisService.del(this.getKey(key));
    }

    private getKey(key: string): string { 
        return `${this.KEY_PREFIX}-${key}`;
    }
}

