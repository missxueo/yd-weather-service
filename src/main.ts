/**
 * @author ZhouMeng
 * 
 */
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// 载入第三方接口mock
import './mock';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  const options = new DocumentBuilder()
    .setTitle('YD_WEATHER_API')
    .setDescription('The WEATHER API description')
    .setVersion('1.0')
    .addTag('weather')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const logger = await app.resolve(Logger);
  const configService = await app.resolve(ConfigService);
  
  const port = Number.parseInt(configService.get("APP_PORT")) || 3000; 
  await app.listen(port);
  logger.log(`application is listen on ${port} ...`);
}
bootstrap();
