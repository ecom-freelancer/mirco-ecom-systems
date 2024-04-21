import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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
import { ApiSuccessResponse } from '@packages/nest-helper';
import {
  GetInventoryEntityListQuery,
  GetInventoryEntityListResponse,
} from './dtos/get-inventory-entity-list.dto';
import { InventoryEntityDto } from './dtos/inventory-entity.dto';

@Protected()
@ApiTags('Inventory Entity')
@ApiBearerAuth('Authorization')
@Controller('inventory-entity')
export class InventoryEntityController {
  constructor(private inventoryEntityService: InventoryEntityService) {}

  @Get()
  @ApiSuccessResponse({
    status: 200,
    type: GetInventoryEntityListResponse,
  })
  async getInventoryEntityList(
    @Query() query: GetInventoryEntityListQuery,
  ): Promise<GetInventoryEntityListResponse> {
    const res = await this.inventoryEntityService.getInventoryEntityList(query);
    return {
      dataList: plainToInstance(InventoryEntityDto, res.dataList, {
        excludeExtraneousValues: true,
      }),
      totalPage: res.totalPage,
      totalRecord: res.totalRecord,
    };
  }

  @Post()
  @ApiSuccessResponse({
    status: 200,
    type: null,
  })
  async createInventoryEntity(
    @Body() payload: CreateInventoryEntityDto,
  ): Promise<void> {
    return await this.inventoryEntityService.createInventoryEntity(payload);
  }

  @Put(':id')
  @ApiSuccessResponse({
    status: 201,
    type: UpdateInventoryEntityResponse,
  })
  async updateInventoryEntity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInventoryEntityDto,
  ): Promise<UpdateInventoryEntityResponse> {
    const inventoryEntity =
      await this.inventoryEntityService.updateInventoryEntity(id, payload);

    return plainToInstance(UpdateInventoryEntityResponse, inventoryEntity, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @ApiSuccessResponse({
    status: 200,
    type: GetInventoryEntityDetailResponse,
  })
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
