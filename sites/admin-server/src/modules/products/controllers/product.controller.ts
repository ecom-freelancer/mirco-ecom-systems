import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dtos';
import { ProductService } from '../services/product.service';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth('Authorization')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return 'Products';
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return await this.productService.upsertProduct(body);
  }
}
