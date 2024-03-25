import { DynamicModule, Module } from '@nestjs/common';
import { FacebookStrategy } from './facebook.strategy';
import { FacebookOptions } from './interfaces/config.interface';

@Module({
  providers: [FacebookStrategy],
})

// https://dev.to/elishaking/how-to-implement-facebook-login-with-nestjs-90h
export class FacebookModule {
  static forRootAsync(options: FacebookOptions): DynamicModule {
    return {
      module: FacebookModule,
      global: true,
      providers: [
        {
          provide: FacebookStrategy,
          useFactory: () => new FacebookStrategy(options),
        },
      ],
      exports: [FacebookStrategy],
    };
  }
}
