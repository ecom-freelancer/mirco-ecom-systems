import { Injectable } from '@nestjs/common';
import { CreateInventoryEntityDto } from './dtos/create-inventory-entity.dto';

@Injectable()
export class InventoryEntityService {
  async createInventoryEntity(
    payload: CreateInventoryEntityDto,
  ): Promise<void> {
    const { barCode, status, skuInventoryId } = payload;
    console.log({
      barCode,
      status,
      skuInventoryId,
    });
  }
}
