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
import * as crypto from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { generateSessionId } from '@packages/nest-helper';
import { SkuInventoryService } from '../sku-inventory/sku-inventory.service';
import { UpdateInventoryEntityDto } from './dtos/update-inventory-entity.dto';

const encMethod = 'aes-256-cbc';

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
    const secretIV = this.configService.get('FOUR');
    this.encIv = crypto
      .createHash('sha512')
      .update(secretIV)
      .digest('hex')
      .substring(0, 16);
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
      const hashKey = crypto
        .createHash('sha512')
        .update(secretKey)
        .digest('hex')
        .substring(0, 32);

      // Save entity to DB
      await queryRunner.manager.save(InventoryEntity, {
        barCode: this.encryptData(barCode, hashKey, this.encIv),
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
      barCode: this.decryptData(
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

  encryptData(data: string, key: string, encIv: string) {
    const cipher = crypto.createCipheriv(encMethod, key, encIv);
    const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    return Buffer.from(encrypted).toString('base64');
  }

  decryptData(encryptedData: string, key: string, encIv: string) {
    const buff = Buffer.from(encryptedData, 'base64');
    encryptedData = buff.toString('utf-8');
    const decipher = crypto.createDecipheriv(encMethod, key, encIv);
    return (
      decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf8')
    );
  }
}
