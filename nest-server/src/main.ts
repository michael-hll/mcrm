import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);  

  // Log each request
  app.use((req, res, next) => {
    logger.log(`Request ${req.method} ${req.originalUrl}`);
    next();
  });


  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  await app.listen(3000);
}
bootstrap();
