import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // ###################### Prefijo en la ruta con api ##########################
  app.setGlobalPrefix('api');
  // ###########################################################################

  
  // ################## Configuracion de Pipe modo global #######################
  app.useGlobalPipes( 
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  // ###########################################################################


  // ##################### Configuración de Documentación ######################
  const config = new DocumentBuilder()
    .setTitle('Documentación de la API test nestjs shop') // Se coloca el titulo de la documentación
    .setDescription('The API description') // Se coloca la descripción de la documentación
    .addBearerAuth({
      description: 'Default JWT Authorization',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    },'Coloque un token valido') // Permite colocar token valido para las router protegidas
    // .addSecurityRequirements('Token') // Permite colocar token valido para las router protegidas
    .setVersion('1.0') // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
  // ###########################################################################


  // ##################### Determinar el puerto en que se escuchara la aplicación ######################
  await app.listen(process.env.SERV_PORT);
  logger.log(`App ejecutandoce en el puerto: ${process.env.SERV_PORT}`);
  logger.log(`Más informcaión visite. ${process.env.SERV_HOST}:${process.env.SERV_PORT}/api`);
  // console.log(`App ejecutandoce en el puerto: ${process.env.SERV_PORT}`);
  // console.log(`Más informcaión visite. ${process.env.SERV_HOST}:${process.env.SERV_PORT}/api`);

  
}
bootstrap();
