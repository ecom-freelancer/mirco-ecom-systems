import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
import { UpsertSKUDto } from '../dtos/upsert-sku.dto';
import { GetListProductSkuDto } from '../dtos/product-sku.dto';
import { ProductSkuService } from '../services/product-sku.service';
import { SeoInfoDto } from 'modules/seo-info';

@Controller('products/:productId')
@ApiTags('Product Detail')
@ApiBearerAuth('Authorization')
@Protected()
export class ProductDetailController {
  constructor(
    private readonly productService: ProductService,
    private readonly productVariantService: ProductVariantService,
    private readonly productSkuService: ProductSkuService,
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

  @Get('skus')
  @ApiSuccessResponse({
    type: GetListProductSkuDto,
    status: 200,
  })
  async getAllSkus(
    @Param('productId') id: number,
  ): Promise<GetListProductSkuDto> {
    const skus = await this.productSkuService.getAllSkusByProductId(id);
    return plainToInstance(
      GetListProductSkuDto,
      { items: skus },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  @Post('skus')
  @ApiSuccessResponse({
    type: UpsertDto,
    status: 201,
  })
  async createSku(
    @Body() payload: UpsertSKUDto,
    @Param('productId') productId: number,
  ) {
    if (await this.productSkuService.isExistSku(payload.sku)) {
      throw new BadRequestException('Sku already exist.');
    }
    const response = await this.productSkuService.createOrUpdateSku(
      productId,
      payload,
    );

    return {
      id: response.sku,
    };
  }

  @Put('skus/:sku')
  @ApiSuccessResponse({
    type: UpsertDto,
    status: 200,
  })
  async updateSku(
    @Param('sku') sku: string,
    @Param('productId') productId: number,
    @Body() payload: UpsertSKUDto,
  ) {
    if (!(await this.productSkuService.isExistSku(sku, productId))) {
      throw new NotFoundException('Sku not found in this product.');
    }
    await this.productSkuService.createOrUpdateSku(productId, payload);
    return {
      id: sku,
    };
  }
  @Delete('variants/:variantId')
  @ApiSuccessResponse({
    status: 200,
  })
  async deleteVariant(
    @Param('variantId') variantId: number,
    @Param('productId') productId: number,
  ) {
    if (
      !(await this.productVariantService.existVariant(variantId, productId))
    ) {
      throw new NotFoundException('Variant not found');
    }

    await this.productVariantService.deleteVariant(variantId);
  }

  @Post('skus/:sku/seo')
  async updateSkuSeo(
    @Param('sku') sku: string,
    @Param('productId') productId: number,
    @Body() payload: SeoInfoDto,
  ) {
    if (!(await this.productSkuService.isExistSku(sku, productId))) {
      throw new NotFoundException('Sku not found in this product.');
    }
    await this.productSkuService.updateSeoForSku(sku, payload);
  }
}
