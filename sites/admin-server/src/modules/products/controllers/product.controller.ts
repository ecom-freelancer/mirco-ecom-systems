import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dtos';
import { ProductService } from '../services/product.service';
import { Protected } from '../../auth/auth.guard';
import {
  GetProductListParams,
  GetProductListResponse,
  ProductDto,
} from '../dtos/get-product.dto';
import { plainToInstance } from 'class-transformer';

@Protected()
@Controller('products')
@ApiTags('Products')
@ApiBearerAuth('Authorization')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProductList(
    @Query() query: GetProductListParams,
  ): Promise<GetProductListResponse> {
    const { dataList, totalPage, totalRecord } =
      await this.productService.getProductList(query);

    return {
      totalPage,
      totalRecord,
      dataList: plainToInstance(ProductDto, dataList, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return await this.productService.upsertProduct(body);
  }
}
