import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

@Module({
  providers: [InventoryService],
  controllers: [InventoryController]
})
export class InventoryModule {}
