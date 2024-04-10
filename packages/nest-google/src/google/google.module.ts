import { DynamicModule, Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleOptions } from './interfaces/config.interface';
import { GoogleSpreadSheetService } from './google-spreadsheet.service';

@Module({
  providers: [GoogleService, GoogleSpreadSheetService],
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
        {
          provide: GoogleSpreadSheetService,
          useFactory: () => new GoogleSpreadSheetService(options),
        },
      ],
      exports: [GoogleService, GoogleSpreadSheetService],
    };
  }
}
