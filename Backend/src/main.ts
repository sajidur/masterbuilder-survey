/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Swagger Configuration
//   const config = new DocumentBuilder()
//     .setTitle('My API')
//     .setDescription('API documentation for my project')
//     .setVersion('1.0')
//     .addTag('features') // Optional group/tag name
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document); // Swagger served at /api

//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation Pipe - critical for DTOs to work properly
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               // strips unrecognized properties
      forbidNonWhitelisted: true,    // throws error for extra properties
      transform: true,               // transforms input types using class-transformer
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my project')
    .setVersion('1.0')
    .addTag('features')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI served at /api
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
