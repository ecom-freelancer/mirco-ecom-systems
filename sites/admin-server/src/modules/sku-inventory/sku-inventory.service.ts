import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  InjectRepository,
  InventoryEntityEntity as InventoryEntity,
  InventoryStatus,
  SkuInventoriesEntity,
} from '@packages/nest-mysql';
import { In, Repository } from 'typeorm';
import { CreateSkuInventoryDto } from './dto/create-sku-inventory.dto';
import { ProductSkuService } from '../products/services/product-sku.service';
import { UpdateSkuInventoryDto } from './dto/update-sku-inventory.dto';
import { GetSkuInventoryListQuery } from './dto/get-sku-inventory-list.dto';

@Injectable()
export class SkuInventoryService {
  constructor(
    @InjectRepository(SkuInventoriesEntity)
    private readonly skuInventoriesRepository: Repository<SkuInventoriesEntity>,
    private readonly productSkuService: ProductSkuService,
  ) {}

  async createSkuInventory(payload: CreateSkuInventoryDto) {
    const { sku } = payload;

    if (!(await this.productSkuService.isExistSku(sku))) {
      throw new NotFoundException('Product SKU not found');
    }

    if (!!(await this.skuInventoriesRepository.exists({ where: { sku } }))) {
      throw new BadRequestException('An inventory with this sku is existed');
    }

    await this.skuInventoriesRepository.save(payload);
  }

  async updateSkuInventory(id: number, payload: UpdateSkuInventoryDto) {
    const skuInventory = await this.skuInventoriesRepository.findOneBy({ id });

    if (!skuInventory) {
      throw new NotFoundException('Inventory SKU not found');
    }

    await this.skuInventoriesRepository.save({
      ...skuInventory,
      totalAvailable: payload.totalAvailable,
    });
  }

  async getSkuInventoryById(id: number) {
    return await this.skuInventoriesRepository.findOneBy({ id });
  }

  async getSkuInventoryBySku(sku: string) {
    return await this.skuInventoriesRepository.findOneBy({ sku });
  }

  async getSkuInventoryList(query: GetSkuInventoryListQuery) {
    const { productId } = query;
    const condition: any = {};

    if (!!productId) {
      const skuList = (
        await this.productSkuService.getAllSkusByProductId(productId)
      ).map(({ sku }) => sku);

      condition.sku = In(skuList);
    }

    return await this.skuInventoriesRepository.find({ where: condition });
  }

  // get by id or sku
  async getSkuInventoryDetail(id: string) {
    const skuInventory = await this.skuInventoriesRepository.findOne({
      where: [{ id: parseInt(id as string) }, { sku: id }],
      relations: {
        inventoryEntities: true,
      },
    });

    const countDetail: Record<InventoryStatus, number> = {
      [InventoryStatus.draft]: 0,
      [InventoryStatus.disable]: 0,
      [InventoryStatus.enable]: 0,
      [InventoryStatus.sold]: 0,
    };

    skuInventory.inventoryEntities.forEach((entity: InventoryEntity) => {
      countDetail[entity.status] = countDetail[entity.status] + 1;
    });

    return { ...skuInventory, countDetail };
  }
}
