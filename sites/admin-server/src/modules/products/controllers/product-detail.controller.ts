import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { ApiSuccessResponse } from '@packages/nest-helper';
import { ProductDetailDto, UpdateProductDto } from '../dtos';
import { plainToInstance } from 'class-transformer';
import { Protected } from 'modules/auth/auth.guard';

@Controller('products/:productId')
@ApiTags('Product Detail')
@ApiBearerAuth('Authorization')
@Protected()
export class ProductDetailController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiSuccessResponse({
    message: 'Get product detail',
    status: 200,
    type: ProductDetailDto,
  })
  async getProductDetail(
    @Param('productId') id: number,
  ): Promise<ProductDetailDto> {
    const product = this.productService.getProductDetail({
      id,
    });
    const response = plainToInstance(ProductDetailDto, product, {
      excludeExtraneousValues: true,
    });

    return response;
  }

  @Post()
  async updateProduct(
    @Param('productId') id: number,
    @Body() payload: UpdateProductDto,
  ) {
    if (payload.id !== id) {
      throw new BadRequestException('Product id must be the same');
    }
    await this.productService.upsertProduct(payload);
  }
}
