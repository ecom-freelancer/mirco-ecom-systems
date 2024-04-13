import { Controller, Post } from '@nestjs/common';
import { Protected } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateInventoryEntityDto } from './dtos/create-inventory-entity.dto';
import { InventoryEntityService } from './inventory-entity.service';

@Protected()
@ApiTags('Inventory Entity')
@ApiBearerAuth('Authorization')
@Controller('inventory-entity')
export class InventoryEntityController {
  constructor(private inventoryEntityService: InventoryEntityService) {}

  @Post()
  async createInventoryEntity(
    payload: CreateInventoryEntityDto,
  ): Promise<void> {
    return await this.inventoryEntityService.createInventoryEntity(payload);
  }
}
