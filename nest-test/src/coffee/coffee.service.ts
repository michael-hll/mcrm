import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CoffeeService {
  constructor(
    private readonly userService: UserService
  ) {}
}
