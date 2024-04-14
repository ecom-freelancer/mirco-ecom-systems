import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Protected } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateInventoryEntityDto } from './dtos/create-inventory-entity.dto';
import { InventoryEntityService } from './inventory-entity.service';
import { GetInventoryEntityDetailResponse } from './dtos/get-inventory-entity-detail.dto';
import { plainToInstance } from 'class-transformer';
import {
  UpdateInventoryEntityDto,
  UpdateInventoryEntityResponse,
} from './dtos/update-inventory-entity.dto';

@Protected()
@ApiTags('Inventory Entity')
@ApiBearerAuth('Authorization')
@Controller('inventory-entity')
export class InventoryEntityController {
  constructor(private inventoryEntityService: InventoryEntityService) {}

  @Post()
  async createInventoryEntity(
    @Body() payload: CreateInventoryEntityDto,
  ): Promise<void> {
    return await this.inventoryEntityService.createInventoryEntity(payload);
  }

  @Put(':id/status')
  async updateInventoryEntity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInventoryEntityDto,
  ): Promise<UpdateInventoryEntityResponse> {
    const inventoryEntity =
      await this.inventoryEntityService.updateInventoryEntityStatus(
        id,
        payload,
      );

    return plainToInstance(UpdateInventoryEntityResponse, inventoryEntity, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async getInventoryEntityDetail(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetInventoryEntityDetailResponse> {
    const inventoryEntity =
      await this.inventoryEntityService.getInventoryEntityById(id);

    return plainToInstance(GetInventoryEntityDetailResponse, inventoryEntity, {
      excludeExtraneousValues: true,
    });
  }
}
