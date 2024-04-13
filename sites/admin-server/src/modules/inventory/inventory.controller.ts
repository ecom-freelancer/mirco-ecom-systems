import { Controller, Post } from '@nestjs/common';
import { Protected } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateInventoryEntityDto } from './dtos/create-inventory-entity.dto';

@Protected()
@Controller('inventory')
@ApiTags('Inventory')
@ApiBearerAuth('Authorization')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async createInventoryEntity(
    payload: CreateInventoryEntityDto,
  ): Promise<void> {
    return await this.inventoryService.createInventoryEntity(payload);
  }
}
