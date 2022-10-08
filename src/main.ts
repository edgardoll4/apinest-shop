import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Prefijo en la ruta con api
  app.setGlobalPrefix('api');
  
  // Configuracion de Pipe modo global
  app.useGlobalPipes( 
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Documentación de la API test nestjs shop')
    .setDescription('The API description')
    .setVersion('1.0') // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);


  await app.listen(process.env.SERV_PORT);
  logger.log(`App ejecutandoce en el puerto: ${process.env.SERV_PORT}`);
  logger.log(`Más informcaión visite. ${process.env.SERV_HOST}:${process.env.SERV_PORT}/api`);
  // console.log(`App ejecutandoce en el puerto: ${process.env.SERV_PORT}`);
  // console.log(`Más informcaión visite. ${process.env.SERV_HOST}:${process.env.SERV_PORT}/api`);

  
}
bootstrap();
