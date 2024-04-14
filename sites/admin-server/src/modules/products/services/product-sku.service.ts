import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  InjectDataSource,
  InjectRepository,
  ProductAttributeGroupEntity,
  ProductSkuEntity,
  SeoInfoEntity,
} from '@packages/nest-mysql';
import { DataSource, IsNull, Not, Repository } from 'typeorm';
import { UpsertSKUDto } from '../dtos/upsert-sku.dto';
import { SeoInfoDto } from 'modules/seo-info';

@Injectable()
export class ProductSkuService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(ProductSkuEntity)
    private readonly skuRepository: Repository<ProductSkuEntity>,
  ) {}

  async createOrUpdateSku(productId: number, payload: UpsertSKUDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const skuInOtherProduct = await queryRunner.manager.findOne(
        ProductSkuEntity,
        {
          where: {
            sku: payload.sku,
            productId: Not(productId),
          },
        },
      );

      if (skuInOtherProduct) {
        throw new BadRequestException('Sku already exists in another product');
      }

      if (payload.variantId) {
        const variantInOtherSku = await queryRunner.manager.findOne(
          ProductSkuEntity,
          {
            where: {
              variantId: payload.variantId,
              sku: Not(payload.sku),
            },
          },
        );

        if (!!variantInOtherSku) {
          throw new BadRequestException(
            'Variant already exists in another sku',
          );
        }
      }

      const sku = await queryRunner.manager.save(ProductSkuEntity, {
        sku: payload.sku,
        name: payload.name,
        slug: payload.slug,
        sellable: payload.sellable,
        sellPrice: payload.sellPrice,
        listPrice: payload.listPrice ?? 0,
        seoInfoId: payload.seoInfoId,
        variantId: payload.variantId,
        productId: productId,
        images: payload.images,
      });

      if (payload.variantId) {
        await queryRunner.manager.update(
          ProductAttributeGroupEntity,
          payload.variantId,
          {
            sku: payload.sku,
          },
        );
      }

      await queryRunner.commitTransaction();

      return sku;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async updateSeoForSku(sku: string, seoInfo: SeoInfoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const productSku = await queryRunner.manager.findOne(ProductSkuEntity, {
        where: {
          sku: sku,
        },
      });

      if (!productSku) {
        throw new NotFoundException('Sku not found');
      }

      const seoInfoEntity = await queryRunner.manager.save(SeoInfoEntity, {
        ...seoInfo,
      });

      productSku.seoInfoId = seoInfoEntity.id;

      await queryRunner.manager.save(ProductSkuEntity, productSku);

      await queryRunner.commitTransaction();

      return productSku;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  // get all skus of product
  async getAllSkusByProductId(productId: number) {
    return await this.skuRepository.find({
      where: { productId },
      relations: {
        seoInfo: true,
        variant: true,
      },
    });
  }

  async isExistSku(sku: string, productId?: number) {
    return await this.skuRepository.exists({
      where: { sku, productId: productId ? productId : Not(IsNull()) },
    });
  }

  async upsertSKUSeoInfo(sku: string, seoInfo: SeoInfoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const seoInfoEntity = await queryRunner.manager.save(SeoInfoEntity, {
        ...seoInfo,
      });

      // update sku
      await queryRunner.manager.update(ProductSkuEntity, sku, {
        seoInfoId: seoInfoEntity.id,
      });

      await queryRunner.commitTransaction();

      return seoInfoEntity;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
