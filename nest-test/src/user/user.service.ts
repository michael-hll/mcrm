import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @Inject("VALUE_01")
    private val01: string,
    @Inject("FACTORY_01")
    private fac01: any,
    @Inject("FACTORY_02")
    private fac02: any,
    @Inject("FACTORY_03")
    private fac03: any,
    private readonly configService: ConfigService,
  ){
    console.log(val01, fac01, fac02, fac03, configService.get<string>('DATABASE_HOST', 'localhost'));

  }

  find() {
    return "UserService.find method: " + JSON.stringify(this.val01);
  }
}
