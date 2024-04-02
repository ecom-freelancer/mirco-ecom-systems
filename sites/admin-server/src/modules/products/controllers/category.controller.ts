import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import {
  ApiSuccessResponse,
  classValidatorException,
} from '@packages/nest-helper';
import { CategoryPayloadDto, GetCategoriesDto } from '../dtos/category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFile } from '../../../configs/file.decorator';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpsertCategoryDto } from '../dtos/upsert-category.dto';
import { ProductCategoryEntity } from '@packages/nest-mysql';
import { UpdateCategoryPayload } from '../interfaces/update-category.interface';
import { CreateCategoryPayload } from '../interfaces/create-category.interface';
import { Protected } from '../../auth/auth.guard';
import { ChangeCategoryDisplayDto } from '../dtos/change-category-status.dto';

@Protected()
@Controller('categories')
@ApiTags('Category')
@ApiBearerAuth('Authorization')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiSuccessResponse({
    status: 200,
    type: GetCategoriesDto,
  })
  async getCategories(): Promise<GetCategoriesDto> {
    const allCategories = await this.categoryService.getCategories();
    return plainToInstance(
      GetCategoriesDto,
      { categories: allCategories },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  @Post()
  @ApiSuccessResponse({
    status: 200,
    type: ProductCategoryEntity,
  })
  async upsertCategory(
    @Body() payload: UpsertCategoryDto,
  ): Promise<ProductCategoryEntity> {
    if (payload.id) {
      return await this.categoryService.updateCategory(
        payload as UpdateCategoryPayload,
      );
    }

    return await this.categoryService.createCategory(
      payload as CreateCategoryPayload,
    );
  }

  @Put(':id/display')
  @ApiSuccessResponse({ status: 200, type: ProductCategoryEntity })
  async changeCategoryDisplay(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ChangeCategoryDisplayDto,
  ) {
    return await this.categoryService.changeCategoryDisplay(
      id,
      payload.display,
    );
  }

  @Post('import')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async importCategory(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'json',
        })
        .addMaxSizeValidator({
          maxSize: 1000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    // parse json file
    const data = JSON.parse(file.buffer.toString());

    const categoryPayload = plainToInstance(CategoryPayloadDto, data, {
      ignoreDecorators: false,
    });

    // validate data

    const errors = await validate(categoryPayload);

    if (errors.length > 0) {
      throw classValidatorException(errors);
    }

    await this.categoryService.importCategories(data);
  }
}
