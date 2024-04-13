import { Module } from '@nestjs/common';
import { InventoryEntityController } from './inventory-entity.controller';
import { InventoryEntityService } from './inventory-entity.service';
import { SkuInventoryModule } from '../sku-inventory/sku-inventory.module';
import { MysqlModule } from '@packages/nest-mysql';

@Module({
  imports: [MysqlModule.getMysqlModule(), SkuInventoryModule],
  controllers: [InventoryEntityController],
  providers: [InventoryEntityService],
})
export class InventoryEntityModule {}
