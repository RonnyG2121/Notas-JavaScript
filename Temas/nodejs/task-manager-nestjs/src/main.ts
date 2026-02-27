import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Nest js permite usar pipes de forma global para que todas las rutas lo utilicen y no tener que repetir código
  // Estos se encargan de hacer todas las validaciones necesarias para la entrada de datos y le manda un error detallado al cliente que consume la api
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
