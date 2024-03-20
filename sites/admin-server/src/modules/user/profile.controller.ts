import {
  Controller,
  Get,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileService } from '@packages/nest-file';
import { ApiFile } from 'src/configs/file.decorator';
import { Express } from 'express';

@Controller('profile')
@ApiTags('Profile')
export class ProfileControler {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async getProfile() {}

  @Put('change-avatar')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async changeAvatar(@UploadedFile('file') avatar?: Express.Multer.File) {
    if (avatar === undefined) {
      throw new Error('Avatar is required');
    }

    const base64Text = avatar.buffer.toString('base64');
    const fileText = `data:${avatar.mimetype};base64,${base64Text}`;

    const file = await this.fileService.uploadImageWithBase64(fileText, {
      folder: 'avatars',
    });
    return file;
  }
}
