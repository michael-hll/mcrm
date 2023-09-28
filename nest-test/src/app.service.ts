import { Injectable, Scope } from '@nestjs/common';

// Scope.REQUEST: create new instance per request
// Scope.TRANSIENT: create new instance for each consumer
// Scope.DEFAULT: singleton instance pattern
@Injectable({scope: Scope.TRANSIENT})
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
