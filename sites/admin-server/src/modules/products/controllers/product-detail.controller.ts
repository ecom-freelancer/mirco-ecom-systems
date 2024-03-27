import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('products/:id')
@ApiTags('Product Detail')
@ApiBearerAuth('Authorization')
export class ProductDetailController {
  constructor() {}

  @Get()
  getProductDetail() {
    return 'Product Detail';
  }
}
