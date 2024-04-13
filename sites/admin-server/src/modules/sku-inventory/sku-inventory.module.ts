import { Module } from '@nestjs/common';
import { SkuInventoryService } from './sku-inventory.service';
import { SkuInventoryController } from './sku-inventory.controller';
import { MysqlModule } from '@packages/nest-mysql';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [MysqlModule.getMysqlModule(), ProductModule],
  providers: [SkuInventoryService],
  controllers: [SkuInventoryController],
  exports: [SkuInventoryService],
})
export class SkuInventoryModule {}
