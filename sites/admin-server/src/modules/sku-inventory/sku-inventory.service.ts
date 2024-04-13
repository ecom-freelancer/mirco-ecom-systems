import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository, SkuInventoriesEntity } from '@packages/nest-mysql';
import { Repository } from 'typeorm';
import { CreateSkuInventoryDto } from './dto/create-sku-inventory.dto';
import { ProductSkuService } from '../products/services/product-sku.service';

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
}
