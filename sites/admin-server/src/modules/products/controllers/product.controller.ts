import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth('Authorization')
export class ProductController {
  constructor() {}

  @Get()
  getProducts() {
    return 'Products';
  }
}
