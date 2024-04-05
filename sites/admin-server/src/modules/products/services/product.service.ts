import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  InjectDataSource,
  InjectRepository,
  ProductAttributeEntity,
  ProductAttributeOptionEntity,
  ProductCategoryEntity,
  ProductEntity,
  SeoInfoEntity,
} from '@packages/nest-mysql';
import { UpsertProductDto } from '../dtos';
import { DataSource, IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductCategoryEntity)
    private readonly categoryRepository: Repository<ProductCategoryEntity>,
  ) {}

  async upsertProduct(payload: UpsertProductDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (!!payload.id) {
        const product = await this.productRepository.findOne({
          where: { id: payload.id },
        });

        if (!product) {
          throw new NotFoundException('Product not found');
        }
      }

      if (
        !(await this.categoryRepository.exists({
          where: { id: payload.categoryId },
        }))
      ) {
        throw new NotFoundException('Category not found');
      }

      const newPayload = { ...payload };
      if (newPayload.seoInfo) {
        const seoInfo = await queryRunner.manager.save(
          SeoInfoEntity,
          newPayload.seoInfo,
        );
        newPayload.seoInfo = seoInfo;
      }

      // validate slug uniqueness
      const slugIsUnique = !(await this.productRepository.exists({
        where: {
          slug: newPayload.slug,
          id: !!newPayload.id ? Not(newPayload.id) : Not(IsNull()),
        },
      }));

      if (!slugIsUnique) {
        throw new BadRequestException('Slug already exists');
      }

      // insert product info
      const newProduct = await queryRunner.manager.save(ProductEntity, {
        id: newPayload.id,
        name: newPayload.name,
        slug: newPayload.slug,
        brand: newPayload.brand,
        categoryId: newPayload.categoryId,
        description: newPayload.description,
        images: newPayload.images,
        userManual: newPayload.userManual,
        deliveryType: newPayload.deliveryType,
        status: newPayload.status,
        seoInfoId: newPayload.seoInfo.id,
        keywords: newPayload.keywords,
      });

      // create attributes
      if (newPayload.attributes) {
        // remove old attributes
        const ids = newPayload.attributes
          .map((attr) => attr.id)
          .filter((i) => !!i);

        await queryRunner.manager
          .getRepository(ProductAttributeEntity)
          .createQueryBuilder()
          .delete()
          .where('productId = :id', { id: newProduct.id })
          .andWhere('id NOT IN (:ids)', { ids: ids.join(',') })
          .execute();

        // insert new attributes
        for (const attr of newPayload.attributes) {
          const attribute = await queryRunner.manager.save(
            ProductAttributeEntity,
            {
              id: attr.id,
              name: attr.name,
              order: attr.order,
              productId: newProduct.id,
              showNameInConsumer: attr.showNameInConsumer,
            },
          );

          if (attribute.id) {
            // remove old options

            const optionIds = attr.options
              .map((opt) => opt.id)
              .filter((i) => !!i);
            await queryRunner.manager
              .getRepository(ProductAttributeOptionEntity)
              .createQueryBuilder()
              .delete()
              .where('attributeId = :id', { id: attribute.id })
              .andWhere('id NOT IN (:ids)', { ids: optionIds.join(',') })
              .execute();
          }

          await queryRunner.manager.save(
            ProductAttributeOptionEntity,
            attr.options.map((opt) => ({
              id: opt.id,
              name: opt.name,
              attributeId: attribute.id,
              order: opt.order,
            })),
          );
        }
      }
      await queryRunner.commitTransaction();

      return newProduct;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async getProductDetail(params: {
    id?: number;
    slug?: string;
  }): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: [
        {
          id: params.id,
        },
        {
          slug: params.slug,
        },
      ],
      relations: {
        category: true,
        skus: true,
        seoInfo: true,
        attributes: {
          options: true,
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async isExitProductById(id: number): Promise<boolean> {
    return await this.productRepository.exists({
      where: { id },
    });
  }

  // get all skus of product

  // upsert a variant of product

  // delete a variant of product
}
