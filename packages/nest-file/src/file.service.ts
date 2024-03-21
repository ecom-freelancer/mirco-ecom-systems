import { Inject, Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class FileService {
  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async uploadImageWithBase64(base64: string, params: { folder: string }) {
    if (!this.validateBase64(base64)) {
      throw new Error('Invalid base64 format');
    }

    const cloudinary = this.cloudinaryService.instance();

    if (!this.cloudinaryService.validateFolder(params.folder)) {
      throw new Error('Invalid folder');
    }
    try {
      const image = await cloudinary.uploader.upload(base64, {
        folder: params.folder,
        resource_type: 'image',
      });
      return image;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private readonly validateBase64 = (base64: string) => {
    const regex = /^data:image\/[a-z]+;base64,/;
    return regex.test(base64);
  };
}
