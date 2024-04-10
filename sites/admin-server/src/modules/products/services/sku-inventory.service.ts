import { Injectable } from '@nestjs/common';
import { GoogleSpreadSheetService } from '@packages/nest-google';
import { getSheetInfoFormUrl, parseSheetInventoryData } from '../helpers';
import { DataSource, Repository } from 'typeorm';
import {
  InjectDataSource,
  InjectRepository,
  InventoryEntityEntity,
  InventoryStatus,
  JbStatus,
  JobAction,
  JobEntity,
  SkuInventoriesEntity,
} from '@packages/nest-mysql';
import { GetInventoryQueries } from '../dtos/inventory.dto';

export const getSkuTarget = (sku: string) => `sku_inventory_${sku}`;

@Injectable()
export class SkuInventoryService {
  constructor(
    private readonly googleSheetService: GoogleSpreadSheetService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(SkuInventoriesEntity)
    private readonly skuInventoryRepo: Repository<SkuInventoriesEntity>,
    @InjectRepository(InventoryEntityEntity)
    private readonly inventoryEntityRepo: Repository<InventoryEntityEntity>,
  ) {}

  async getOrCreateInventoryEntity(sku: string) {
    const inventoryEntity = await this.skuInventoryRepo.findOne({
      where: {
        sku: sku,
      },
    });

    if (inventoryEntity) {
      return inventoryEntity;
    }

    return this.skuInventoryRepo.save({
      sku: sku,
    });
  }

  async importEntitiesForSku(sku: string, googleSheetUrl: string) {
    const skuInventory = await this.getOrCreateInventoryEntity(sku);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { gid, id: sheetId } = getSheetInfoFormUrl(googleSheetUrl);
      const sheets = await this.googleSheetService.getSpreadsheet(sheetId, gid);

      const dataSheet = sheets.map((sheet) => {
        return parseSheetInventoryData(sheet.values);
      });

      const entities = dataSheet.flat();

      const job = await this.dataSource.manager.save(JobEntity, {
        action: JobAction.import_inventory_sku,
        title: 'Import SKU Inventory',
        source: googleSheetUrl,
        totalTask: entities.length,
        completedTask: entities.length,
        completedAt: null,
        status: JbStatus.completed,
        target: getSkuTarget(sku),
      });

      await this.dataSource.manager.insert(
        InventoryEntityEntity,
        entities.map(
          (entity) =>
            ({
              barCode: entity.value,
              hasKey: entity.encode_key,
              skuInventoryId: skuInventory.id,
              status: InventoryStatus.enable,
              jobId: job.id,
            } as InventoryEntityEntity),
        ),
      );

      // update inventory for sku
      const inventory = await this.dataSource.manager.findOne(
        SkuInventoriesEntity,
        {
          where: {
            sku: sku,
          },
        },
      );

      await this.dataSource.manager.update(SkuInventoriesEntity, inventory.id, {
        totalVolume: (inventory.totalVolume || 0) + entities.length,
      });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    // job clone
  }

  async getAllJobBySku(sku: string) {
    return this.dataSource.manager.find(JobEntity, {
      where: {
        target: getSkuTarget(sku),
      },
    });
  }

  async getAllInventories(queries: GetInventoryQueries) {
    const { sku, page, pageSize, keyword, onlyActive } = queries;
    const query = this.dataSource.manager
      .createQueryBuilder(InventoryEntityEntity, 'inventory')
      .leftJoin('inventory.skuInventory', 'sku')
      .where('sku.sku = :sku', { sku });

    if (keyword) {
      query.andWhere('inventory.barCode LIKE :keyword', {
        keyword: `%${keyword}%`,
      });
    }

    if (onlyActive) {
      query.andWhere('inventory.status = :status', {
        status: InventoryStatus.enable,
      });
    }
    return query
      .skip((page - 1) * pageSize)
      .select([
        'inventory.id',
        'inventory.barCode',
        'inventory.hasKey',
        'inventory.status',
        'inventory.createdAt',
      ])
      .take(pageSize)
      .getManyAndCount();
  }

  async statisticInventory(sku: string) {
    const result = await this.inventoryEntityRepo
      .createQueryBuilder('entities')
      .select('entities.status', 'status')
      .addSelect('COUNT(*)', 'total')
      .groupBy('entities.status')
      .getRawMany();

    return result;
  }
}
