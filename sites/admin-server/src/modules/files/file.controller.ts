import {
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Protected } from '../auth/auth.guard';
import { FileService } from '@packages/nest-file';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiSuccessResponse } from '@packages/nest-helper';
import { ImageResponseDto } from './file.dtos';
import { ApiFile } from '../../configs/file.decorator';

@Controller('files')
@ApiTags('Files')
@Protected()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload-image')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiSuccessResponse({
    type: ImageResponseDto,
    status: 200,
  })
  async changeAvatar(
    @UploadedFile('file') image?: Express.Multer.File,
  ): Promise<ImageResponseDto> {
    try {
      /**
       * accept only image file
       */
      if (!image.mimetype.includes('image')) {
        throw new Error('Invalid file type');
      }

      if (image === undefined) {
        throw new Error('Avatar is required');
      }

      const base64Text = image.buffer.toString('base64');
      const fileText = `data:${image.mimetype};base64,${base64Text}`;

      const file = await this.fileService.uploadImageWithBase64(fileText, {
        folder: 'images',
      });
      return {
        url: file.url,
        id: file.public_id,
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
