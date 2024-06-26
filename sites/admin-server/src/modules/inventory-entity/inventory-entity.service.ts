// https://blog.anjalbam.com.np/how-to-encrypt-and-decrypt-data-in-nodejs-using-aes-256
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInventoryEntityDto } from './dtos/create-inventory-entity.dto';
import {
  InjectDataSource,
  InjectRepository,
  InventoryEntityEntity as InventoryEntity,
  InventoryStatus,
  SkuInventoriesEntity,
} from '@packages/nest-mysql';
import {
  DataSource,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Between,
  Repository,
} from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {
  decryptData,
  encodeIv,
  encodeKey,
  encryptData,
  generateSessionId,
} from '@packages/nest-helper';
import { SkuInventoryService } from '../sku-inventory/sku-inventory.service';
import { UpdateInventoryEntityDto } from './dtos/update-inventory-entity.dto';
import { GetInventoryEntityListQuery } from './dtos/get-inventory-entity-list.dto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

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
        await this.skuInventoryService.getSkuInventoryById(skuInventoryId);

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
      relations: {
        skuInventory: true,
      },
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
      sku: inventoryEntity.skuInventory.sku,
    };
  }

  async updateInventoryEntity(id: number, payload: UpdateInventoryEntityDto) {
    const inventoryEntity = await this.inventoryEntityRepository.findOne({
      where: { id },
      relations: {
        skuInventory: true,
      },
    });
    if (!inventoryEntity) {
      throw new NotFoundException('Inventory Entity not found');
    }

    if (inventoryEntity.status === InventoryStatus.sold) {
      throw new BadRequestException('Cannot update sold inventory entity');
    }

    // I use the sessionId to generate a unique key, don't mind it :)
    const secretKey = generateSessionId();
    const hashKey = encodeKey(secretKey);

    const updatedInventoryEntity = await this.inventoryEntityRepository.save({
      ...inventoryEntity,
      status: payload.status,
      skuInventoryId: payload.skuInventoryId,
      barCode: encryptData(payload.barCode, hashKey, this.encIv),
      hashKey,
    });

    return {
      ...updatedInventoryEntity,
      barCode: decryptData(
        updatedInventoryEntity.barCode,
        updatedInventoryEntity.hashKey,
        this.encIv,
      ),
      sku: inventoryEntity.skuInventory.sku,
    };
  }

  async getInventoryEntityList(query: GetInventoryEntityListQuery) {
    const { page, pageSize, status, startDate, endDate, skuInventoryId } =
      query;

    let condition: any = {};
    if (!!skuInventoryId) {
      condition.skuInventoryId = skuInventoryId;
    }

    if (!!status && status.length > 0) {
      condition.status = In(status);
    }

    if (!!startDate && !!endDate) {
      condition.createdAt = Between(startDate, endDate);
    } else if (!!startDate) {
      condition.createdAt = MoreThanOrEqual(startDate);
    } else if (!!endDate) {
      condition.createdAt = LessThanOrEqual(endDate);
    }

    const [inventoryEntityList, total] =
      await this.inventoryEntityRepository.findAndCount({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where: condition,
        order: {
          createdAt: 'DESC',
        },
        relations: {
          skuInventory: true,
        },
      });

    return {
      dataList: inventoryEntityList.map((entity) => ({
        ...entity,
        barCode: decryptData(entity.barCode, entity.hashKey, this.encIv),
        sku: entity.skuInventory.sku,
        // keep UTC 0 to display correctly at FE
        createdAt: dayjs(entity.createdAt).utc(true).toISOString(),
      })),
      totalRecord: total,
      totalPage:
        total % pageSize === 0
          ? total / pageSize
          : Math.floor(total / pageSize) + 1,
    };
  }
}
