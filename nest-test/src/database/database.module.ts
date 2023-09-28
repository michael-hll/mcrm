import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionOptions } from 'tls';
import { createConnection } from 'typeorm';

/* Dynamic Module */
@Module({})
export class DatabaseModule {
  static register(connOptions: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: createConnection(),
        }
      ]
    }
  }
}
