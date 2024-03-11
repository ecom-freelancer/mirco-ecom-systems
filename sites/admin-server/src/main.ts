import { createNestApp } from '@packages/nest-helper';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await createNestApp(AppModule, {
    swagger: {
      enabled: true,
      title: 'Admin Server',
      description: 'Admin Server API',
      version: '1.0',
      bearerAuth: true,
      path: 'api_docs',
    },
  });
  await app.listen(3000);
}
bootstrap().then();
