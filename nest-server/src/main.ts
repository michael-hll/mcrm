import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './base/filters/http-exception.filter';
import { WrapResponseInterceptor } from './base/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './base/interceptors/timeout.interceptor';
import { logDuplicateRoutes } from './util/log-duplicate-routes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);  
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
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

  // build api documentation
  const options = new DocumentBuilder()
    .setTitle('MCRM')
    .setDescription('MCRM App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // listen
  await app.listen(3001);
  
  // validation on duplicate routes
  logDuplicateRoutes(app);  
}
bootstrap();
