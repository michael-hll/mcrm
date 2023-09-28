import { Module } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [CoffeeService]
})
export class CoffeeModule {}
