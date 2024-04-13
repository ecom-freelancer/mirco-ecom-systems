import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSkuInventoryDto } from './dto/create-sku-inventory.dto';
import { SkuInventoryService } from './sku-inventory.service';

@Controller('sku-inventory')
@ApiTags('Sku inventory')
@ApiBearerAuth('Authorization')
export class SkuInventoryController {
  constructor(private skuInventoryService: SkuInventoryService) {}

  @Post()
  async createSkuInventory(@Body() payload: CreateSkuInventoryDto) {
    await this.skuInventoryService.createSkuInventory(payload);
  }
}
