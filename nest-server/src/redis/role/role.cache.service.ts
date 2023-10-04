import { Injectable, Logger } from "@nestjs/common";
import { RedisService } from "../redis.service";

@Injectable()
export class RoleCacheService {
  private readonly logger = new Logger(RoleCacheService.name);
  private readonly KEY_PREFIX = '$ROLE$';

  constructor(
    private readonly redisService: RedisService
  ) { }

  async set(key: string, roles: string): Promise<void> {
    await this.redisService.set(this.getKey(key), roles);
  }

  async get(key: string): Promise<string> {
    return await this.redisService.get(this.getKey(key));
  } 

  async del(key: string): Promise<void> {
    await this.redisService.del(this.getKey(key));
  }

  async delRole(role: string): Promise<void> {
    const keys = await this.redisService.keys(`${this.KEY_PREFIX}*`);
    keys.forEach(async key => {
      const catchedRoles = JSON.parse(await this.get(key)) as string[];
      this.set(key, JSON.stringify(catchedRoles.filter(r => r !== role)));
    })
  }

  private getKey(key: string): string {
    if(key.startsWith(this.KEY_PREFIX))return key;
    else return `${this.KEY_PREFIX}-${key}`;
  }
}

