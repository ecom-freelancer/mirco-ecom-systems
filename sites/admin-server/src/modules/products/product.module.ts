import { Module } from '@nestjs/common';
import { MysqlModule } from '@packages/nest-mysql';
import { ProductController } from './controllers/product.controller';
import { ProductDetailController } from './controllers/product-detail.controller';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [MysqlModule.getMysqlModule()],
  providers: [ProductService, CategoryService],
  controllers: [ProductController, ProductDetailController, CategoryController],
})
export class ProductModule {}
