import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import 'dotenv/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { CrudConfigService } from '@nestjsx/crud';
import * as admin from 'firebase-admin';
import { configCRUD } from './constant/config-crud.constant';
import { ResponseFormatInterceptor } from './common/interceptors/response-format.interceptor';
import { HttpExceptionFilter } from './common/exception-filter/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { adminConfig } from './constant/config-firebase.constant';

CrudConfigService.load(configCRUD);
import { AppModule } from './app.module';
import { ValidatorModule } from './validators/validator.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(ValidatorModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Roomify API Documentation')
    .setDescription('This is a Roomify API documentation.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, swaggerDocument);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  Logger.log(`Server is running on http://localhost:${process.env.PORT || 3000}`, 'Info');
}
bootstrap();
