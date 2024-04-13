import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSkuInventoryDto } from './dto/create-sku-inventory.dto';
import { SkuInventoryService } from './sku-inventory.service';
import { UpdateSkuInventoryDto } from './dto/update-sku-inventory.dto';

@Controller('sku-inventory')
@ApiTags('Sku inventory')
@ApiBearerAuth('Authorization')
export class SkuInventoryController {
  constructor(private skuInventoryService: SkuInventoryService) {}

  @Post()
  async createSkuInventory(@Body() payload: CreateSkuInventoryDto) {
    await this.skuInventoryService.createSkuInventory(payload);
  }

  @Post(':id')
  async updateSkuInventory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSkuInventoryDto,
  ) {
    await this.skuInventoryService.updateSkuInventory(id, payload);
  }
}
