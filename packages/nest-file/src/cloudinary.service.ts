import { Injectable } from '@nestjs/common';
import { CloudinaryOptions } from './cloudinary.option';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly cloudinary = v2;
  constructor(private readonly options: CloudinaryOptions) {}

  instance() {
    this.cloudinary.config({
      cloud_name: this.options.cloudName,
      api_key: this.options.apiKey,
      api_secret: this.options.apiSecret,
    });
    return this.cloudinary;
  }

  validateFolder(folder: string) {
    if (this.options.acceptFolders?.length) {
      return this.options.acceptFolders.includes(folder);
    }
    return true;
  }
}
