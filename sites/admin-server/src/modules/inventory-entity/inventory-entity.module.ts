import { Module } from '@nestjs/common';
import { InventoryEntityController } from './inventory-entity.controller';
import { InventoryEntityService } from './inventory-entity.service';

@Module({
  controllers: [InventoryEntityController],
  providers: [InventoryEntityService]
})
export class InventoryEntityModule {}
