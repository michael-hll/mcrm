import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './base/filters/http-exception.filter';
import { WrapResponseInterceptor } from './base/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './base/interceptors/timeout.interceptor';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);  

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    //forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor()
  );
  await app.listen(3000);
}
bootstrap();
