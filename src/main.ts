import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  // * swagger config
  const config = new DocumentBuilder()
    .setTitle('NETFLIX')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // * global pipe config
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
