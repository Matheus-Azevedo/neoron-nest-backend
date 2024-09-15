import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, HttpStatus } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['log', 'error', 'warn', 'debug', 'verbose'], // This will log all the requests to the console and will help in debugging, apply only in development mode
  });

  app.enableCors({
    origin: [
      // 'http://localhost:3000', // This is the frontend URL where the requests will come for development mode
      'https://neoron-next-frontned-f4dt.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: HttpStatus.NO_CONTENT,
  });

  app.use(helmet()); // Helmet is a collection of 14 smaller middleware functions that set security-related HTTP headers, this will help secure the application

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Flights API')
    .setDescription('The flights API for the Neoron project test.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
