import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ModuleClassName } from 'src/base/decorators/module-name.decorator';
import { Name } from 'src/base/decorators/name.decorator';
import { RedisService } from './redis.service';
import { UseAdmin } from 'src/base/decorators/admin.decorator';

@Controller('redis')
@Name('Redis')
@ModuleClassName('RedisModule')
@ApiTags('Redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get()
  @Name('Get All')
  @UseAdmin()
  findAll() {
    return this.redisService.findAll();
  }
}
