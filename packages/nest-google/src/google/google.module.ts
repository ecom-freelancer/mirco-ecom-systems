import { DynamicModule, Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleOptions } from './interfaces/config.interface';

@Module({
  providers: [GoogleService],
})
export class GoogleModule {
  static forRootAsync(options: GoogleOptions): DynamicModule {
    return {
      module: GoogleModule,
      global: true,
      providers: [
        {
          provide: GoogleService,
          useFactory: () => new GoogleService(options),
        },
      ],
      exports: [GoogleService],
    };
  }
}
