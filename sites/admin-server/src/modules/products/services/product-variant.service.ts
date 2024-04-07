import { BadRequestException, Injectable } from '@nestjs/common';
import { UpsertVariantDto } from '../dtos/upsert-variant.dto';
import {
  InjectDataSource,
  InjectRepository,
  ProductAttributeGroupEntity,
  ProductAttributeGroupItemEntity,
} from '@packages/nest-mysql';
import { And, DataSource, Equal, In, Not, Repository } from 'typeorm';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(ProductAttributeGroupEntity)
    private readonly productVariantRepository: Repository<ProductAttributeGroupEntity>,
  ) {}

  async getAllVariants(productId: number) {
    return this.productVariantRepository.find({
      where: { productId },
      relations: {
        items: {
          attribute: true,
          attributeOption: true,
        },
      },
      order: {
        items: {
          attribute: {
            order: 'ASC',
          },
          attributeOption: {
            order: 'ASC',
          },
        },
      },
    });
  }

  async upsertProductVariant(productId: number, payload: UpsertVariantDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //save variant
      const variant = await queryRunner.manager.save(
        ProductAttributeGroupEntity,
        {
          id: payload.id,
          productId,
        },
      );

      const existVariants = await queryRunner.manager.find(
        ProductAttributeGroupEntity,
        {
          where: {
            productId,
            id: Not(variant.id),
            items: [
              ...payload.items.map((item) => ({
                attributeId: item.attributeId,
                attributeOptionId: item.attributeOptionId,
              })),
            ],
          },
          relations: {
            items: true,
          },
        },
      );

      if (existVariants.length > 0) {
        const allVariants = await queryRunner.manager.find(
          ProductAttributeGroupEntity,
          {
            where: {
              productId,
              id: In(existVariants.map((v) => v.id)),
            },
            relations: {
              items: true,
            },
          },
        );

        const suspectVariant = allVariants.find(
          (v) =>
            v.items.length === payload.items.length &&
            payload.items.every((item) =>
              v.items.find(
                (i) =>
                  i.attributeId === item.attributeId &&
                  i.attributeOptionId === item.attributeOptionId,
              ),
            ),
        );

        if (suspectVariant) {
          throw new BadRequestException('Variant already exists');
        }
      }

      const existedOption = await queryRunner.manager.findOne(
        ProductAttributeGroupItemEntity,
        {
          where: [
            ...payload.items.map((item) => ({
              attributeGroupId: And(Not(item.id), Equal(variant.id)),
              attributeId: item.attributeId,
            })),
          ],
          relations: {
            attribute: true,
            attributeOption: true,
          },
        },
      );

      if (existedOption) {
        throw new BadRequestException(
          `Option ${existedOption.attribute.name}/${existedOption.attributeOption.name} already exists in an other variant`,
        );
      }

      const variantDetail = await queryRunner.manager.findOne(
        ProductAttributeGroupEntity,
        {
          where: { id: variant.id },
          relations: {
            items: true,
          },
        },
      );

      // remove old variant items
      const oldVariantIds =
        variantDetail.items
          .map((i) => i.id)
          .filter((item) => !payload.items.find((i) => i.id === item)) || [];

      if (oldVariantIds && oldVariantIds.length > 0) {
        await queryRunner.manager
          .createQueryBuilder()
          .delete()
          .from(ProductAttributeGroupItemEntity)
          .where(`id IN (${oldVariantIds.join(',')})`)
          .execute();
      }

      // save variant items
      await queryRunner.manager.save(
        ProductAttributeGroupItemEntity,
        payload.items.map(
          (item) =>
            ({
              ...item,
              attributeGroupId: variant.id,
            } as ProductAttributeGroupItemEntity),
        ),
      );
      await queryRunner.commitTransaction();
      return variant;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
