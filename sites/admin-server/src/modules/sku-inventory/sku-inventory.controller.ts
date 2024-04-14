import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSkuInventoryDto } from './dto/create-sku-inventory.dto';
import { SkuInventoryService } from './sku-inventory.service';
import { UpdateSkuInventoryDto } from './dto/update-sku-inventory.dto';
import { GetSkuInventoryDetailResponse } from './dto/get-sku-inventory-detail.dto';
import { plainToInstance } from 'class-transformer';
import { ApiSuccessResponse } from '@packages/nest-helper';
import {
  GetSkuInventoryListQuery,
  GetSkuInventoryListResponse,
} from './dto/get-sku-inventory-list.dto';
import { GetInventoryEntityListResponse } from '../inventory-entity/dtos/get-inventory-entity-list.dto';

@Controller('sku-inventory')
@ApiTags('Sku inventory')
@ApiBearerAuth('Authorization')
export class SkuInventoryController {
  constructor(private skuInventoryService: SkuInventoryService) {}

  @Post()
  @ApiSuccessResponse({
    status: 201,
    type: null,
  })
  async createSkuInventory(@Body() payload: CreateSkuInventoryDto) {
    await this.skuInventoryService.createSkuInventory(payload);
  }

  @Post(':id')
  @ApiSuccessResponse({
    status: 201,
    type: null,
  })
  async updateSkuInventory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSkuInventoryDto,
  ) {
    await this.skuInventoryService.updateSkuInventory(id, payload);
  }

  @Get()
  @ApiSuccessResponse({
    status: 200,
    type: GetInventoryEntityListResponse,
  })
  async getSkuInventoryList(
    @Query() query: GetSkuInventoryListQuery,
  ): Promise<GetSkuInventoryListResponse> {
    return await this.skuInventoryService.getSkuInventoryList(query);
  }

  @Get(':id')
  @ApiSuccessResponse({
    status: 200,
    type: GetSkuInventoryDetailResponse,
  })
  async getSkuInventoryDetail(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetSkuInventoryDetailResponse> {
    const res = await this.skuInventoryService.getSkuInventoryDetail(id);
    return plainToInstance(GetSkuInventoryDetailResponse, res, {
      excludeExtraneousValues: true,
    });
  }
}
