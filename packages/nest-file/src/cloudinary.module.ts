import { DynamicModule, Module } from '@nestjs/common';
import { CloudinaryOptions } from './cloudinary.option';
import { CloudinaryService } from './cloudinary.service';
import { FileService } from './file.service';

@Module({})
export class CloudinaryModule {
  static forRootAsync(options: CloudinaryOptions): DynamicModule {
    return {
      module: CloudinaryModule,
      global: true,
      providers: [
        {
          provide: 'CLOUDINARY',
          useFactory: async () => {
            return new CloudinaryService(options);
          },
        },
        FileService,
      ],
      exports: [FileService],
    };
  }
}
