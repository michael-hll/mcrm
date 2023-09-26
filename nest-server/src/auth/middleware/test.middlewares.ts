import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user.service';

@Injectable()
export class TestMiddleware implements NestMiddleware {
	private logger = new Logger(TestMiddleware.name);
	constructor(private userService: UserService) { }

	async use(req: Request, res: Response, next: NextFunction) {
		this.logger.log('This is a message from test middleware...');
		next();
	}
}