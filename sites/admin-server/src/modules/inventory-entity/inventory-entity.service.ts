// https://blog.anjalbam.com.np/how-to-encrypt-and-decrypt-data-in-nodejs-using-aes-256
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryEntityDto } from './dtos/create-inventory-entity.dto';
import {
  InjectDataSource,
  InjectRepository,
  InventoryEntityEntity as InventoryEntity,
  SkuInventoriesEntity,
} from '@packages/nest-mysql';
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {
  generateSessionId,
  encryptData,
  decryptData,
  encodeKey,
  encodeIv,
} from '@packages/nest-helper';
import { SkuInventoryService } from '../sku-inventory/sku-inventory.service';
import { UpdateInventoryEntityDto } from './dtos/update-inventory-entity.dto';

@Injectable()
export class InventoryEntityService {
  private readonly encIv: string;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(InventoryEntity)
    private readonly inventoryEntityRepository: Repository<InventoryEntity>,
    private readonly configService: ConfigService,
    private readonly skuInventoryService: SkuInventoryService,
  ) {
    const secretIV = this.configService.get('SECRET_FOUR');
    this.encIv = encodeIv(secretIV);
  }

  async createInventoryEntity(
    payload: CreateInventoryEntityDto,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { barCode, status, skuInventoryId } = payload;
      const skuInventory =
        await this.skuInventoryService.getSkuInventory(skuInventoryId);

      if (!skuInventory) {
        throw new NotFoundException('Inventory SKU not found');
      }

      // I use the sessionId to generate a unique key, don't mind it :)
      const secretKey = generateSessionId();
      const hashKey = encodeKey(secretKey);

      // Save entity to DB
      await queryRunner.manager.save(InventoryEntity, {
        barCode: encryptData(barCode, hashKey, this.encIv),
        hashKey,
        status,
        skuInventoryId,
      });

      // Increase total volume
      await queryRunner.manager.save(SkuInventoriesEntity, {
        ...skuInventory,
        totalVolume: skuInventory.totalVolume + 1,
      });

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async getInventoryEntityById(id: number) {
    const inventoryEntity = await this.inventoryEntityRepository.findOne({
      where: { id },
    });

    if (!inventoryEntity) {
      throw new NotFoundException('Inventory Entity not found');
    }

    return {
      ...inventoryEntity,
      barCode: decryptData(
        inventoryEntity.barCode,
        inventoryEntity.hashKey,
        this.encIv,
      ),
    };
  }

  async updateInventoryEntityStatus(
    id: number,
    payload: UpdateInventoryEntityDto,
  ): Promise<InventoryEntity> {
    const inventoryEntity = await this.inventoryEntityRepository.findOneBy({
      id,
    });
    if (!inventoryEntity) {
      throw new NotFoundException('Inventory Entity not found');
    }
    return await this.inventoryEntityRepository.save({
      ...inventoryEntity,
      status: payload.status,
    });
  }
}
