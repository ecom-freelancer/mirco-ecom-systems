import { Injectable, NotFoundException } from '@nestjs/common';
import {
  InjectRepository,
  InventoryEntityEntity as InventoryEntity,
  SkuInventoriesEntity,
} from '@packages/nest-mysql';
import { Repository } from 'typeorm';
import { CreateInventoryEntityDto } from './dtos/create-inventory-entity.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryEntityRepository: Repository<InventoryEntity>,
    @InjectRepository(SkuInventoriesEntity)
    private readonly skuInventoriesRepository: Repository<SkuInventoriesEntity>,
  ) {}

  async createInventoryEntity(
    payload: CreateInventoryEntityDto,
  ): Promise<void> {
    const { barCode, status, skuInventoryId } = payload;
    console.log({
      barCode,
      status,
      skuInventoryId,
      inventoryEntityRepository: this.inventoryEntityRepository,
    });

    const skuInventory = this.skuInventoriesRepository.findOneBy({
      id: skuInventoryId,
    });

    if (!skuInventory) {
      throw new NotFoundException(`skuInventory not found`);
    }
  }
}
