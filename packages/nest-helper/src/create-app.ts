import {
  INestApplication,
  NestInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { classValidatorException } from './validators';
import { HttpExceptionFilter, TransformInterceptor } from './interceptors';

export interface ICreateServerOptions {
  swagger?: {
    enabled: boolean;
    title: string;
    description: string;
    version?: string;
    bearerAuth?: boolean;
    path?: string;
  };
  interceptors?: Array<NestInterceptor>;
}

export const createNestApp = async (
  module: any,
  options: ICreateServerOptions,
): Promise<INestApplication> => {
  const app = await NestFactory.create(module);

  app.setGlobalPrefix('/api');

  app.enableCors();

  if (options.swagger?.enabled) {
    const documentBuilder = new DocumentBuilder()
      .setTitle(options.swagger.title)
      .setDescription(options.swagger.description)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'Authorization',
      );

    const config = documentBuilder.build();

    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: false,
    });

    SwaggerModule.setup(options.swagger.path ?? 'api_docs', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: classValidatorException,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(
    new TransformInterceptor(),
    ...(options.interceptors || []),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  return app;
};
