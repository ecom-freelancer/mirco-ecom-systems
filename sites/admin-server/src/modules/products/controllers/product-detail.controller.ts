import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { ApiSuccessResponse } from '@packages/nest-helper';
import { ProductDetailDto, UpdateProductDto } from '../dtos';
import { plainToInstance } from 'class-transformer';
import { Protected } from 'modules/auth/auth.guard';
import { UpsertDto } from 'configs/base.dto';
import { UpsertVariantDto } from '../dtos/upsert-variant.dto';
import { ProductVariantService } from '../services/product-variant.service';
import { ListVariantsDto } from '../dtos/variant-dto';

@Controller('products/:productId')
@ApiTags('Product Detail')
@ApiBearerAuth('Authorization')
@Protected()
export class ProductDetailController {
  constructor(
    private readonly productService: ProductService,
    private readonly productVariantService: ProductVariantService,
  ) {}

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
    await this.productService.upsertProduct({ ...payload, id: id });
  }

  @Post('variants')
  @ApiSuccessResponse({
    type: UpsertDto,
    status: 200,
  })
  async updateProductVariant(
    @Param('productId') id: number,
    @Body() payload: UpsertVariantDto,
  ): Promise<UpsertDto> {
    const variant = await this.productVariantService.upsertProductVariant(
      id,
      payload,
    );
    return {
      id: variant.id,
    };
  }

  @Get('variants')
  @ApiSuccessResponse({
    type: ListVariantsDto,
    status: 200,
  })
  async getAllVariants(
    @Param('productId') id: number,
  ): Promise<ListVariantsDto> {
    const variants = await this.productVariantService.getAllVariants(id);
    return plainToInstance(
      ListVariantsDto,
      { variants },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
