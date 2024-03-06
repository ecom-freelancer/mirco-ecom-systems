import {
  INestApplication,
  NestInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { classValidatorException } from './validators';
import { ErrorInterceptor, TransformInterceptor } from './interceptors';

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

  if (options.swagger?.enabled) {
    const documentBuilder = new DocumentBuilder()
      .setTitle(options.swagger.title)
      .setDescription(options.swagger.description)
      .setVersion(options.swagger.version ?? '1.0');

    const config = documentBuilder.build();

    const document = SwaggerModule.createDocument(app, config);

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
    new ErrorInterceptor(),
    ...(options.interceptors || []),
  );

  return app;
};
