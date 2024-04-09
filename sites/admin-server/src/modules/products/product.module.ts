import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MysqlModule } from '@packages/nest-mysql';
import { ProductController } from './controllers/product.controller';
import { ProductDetailController } from './controllers/product-detail.controller';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { CategoryController } from './controllers/category.controller';
import { ProductDetailMiddleware } from './middlewares';
import { ProductVariantService } from './services/product-variant.service';
import { ProductSkuService } from './services/product-sku.service';

@Module({
  imports: [MysqlModule.getMysqlModule()],
  providers: [
    ProductService,
    CategoryService,
    ProductVariantService,
    ProductSkuService,
  ],
  controllers: [ProductController, ProductDetailController, CategoryController],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductDetailMiddleware).forRoutes(ProductDetailController);
  }
}
