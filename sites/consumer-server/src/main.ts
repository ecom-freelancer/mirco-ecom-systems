import { createNestApp } from '@packages/nest-helper';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await createNestApp(AppModule, {
    swagger: {
      enabled: true,
      title: 'Consumer Server',
      description: 'Consumer Server API',
      version: '1.0',
      bearerAuth: true,
      path: 'api_docs',
    },
  });
  await app.listen(process.env.PORT || 3000);
}

bootstrap().then();
