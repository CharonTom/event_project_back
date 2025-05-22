import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtGuard } from './auth/guards/jwt.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/assets', express.static(join(__dirname, '..', 'src/assets')));

  const config = new DocumentBuilder()
    .setTitle('API EVENTLY')
    .setDescription(
      "Ceci est la documentation Swagger de l'API Evently, il n'est pas encore possible d'écrire directement dans la base de données depuis le Swagger, je vous invite donc à utiliser un logiciel approprié de type Postman ou Insomnia pour tester l'API.",
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, documentFactory);

  app.enableCors();
  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
