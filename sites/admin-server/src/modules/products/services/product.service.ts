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
import {
  Between,
  DataSource,
  In,
  IsNull,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { GetProductListParams } from '../dtos/get-product.dto';
import { BatchUpdateStatusDto } from '../dtos/batch-update-status.dto';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

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
        seoInfoId: newPayload.seoInfo?.id,
        keywords: newPayload.keywords,
      });

      // create attributes
      if (newPayload.attributes) {
        // remove old attributes
        const ids = newPayload.attributes
          .map((attr) => attr.id)
          .filter((i) => !!i);

        if (ids.length > 0)
          await queryRunner.manager
            .getRepository(ProductAttributeEntity)
            .createQueryBuilder()
            .delete()
            .where('productId = :id', { id: newProduct.id })
            .andWhere(`id NOT IN (${ids.join(',')})`)
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

            if (optionIds.length > 0)
              await queryRunner.manager
                .getRepository(ProductAttributeOptionEntity)
                .createQueryBuilder()
                .delete()
                .where('attributeId = :id', { id: attribute.id })
                .andWhere(`id NOT IN (${optionIds.join(',')})`)
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
        seoInfo: true,
        attributes: {
          options: true,
        },
      },
      order: {
        attributes: {
          order: 'ASC',
          options: {
            order: 'ASC',
          },
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

  async getProductList(params: GetProductListParams) {
    const {
      page,
      pageSize,
      endDate,
      startDate,
      searchText,
      categoryId,
      productStatus,
    } = params;
    let condition: any = {};
    if (!!startDate && !!endDate) {
      condition.createdAt = Between(startDate, endDate);
    } else if (!!startDate) {
      condition.createdAt = MoreThanOrEqual(startDate);
    } else if (!!endDate) {
      condition.createdAt = LessThanOrEqual(endDate);
    }

    if (!!categoryId) {
      condition.categoryId = categoryId;
    }

    if (!!productStatus && productStatus.length > 0) {
      condition.productStatus = In(productStatus);
    }

    const [productList, total] = await this.productRepository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: !!searchText
        ? [
            { ...condition, name: Like(`%${searchText}%`) },
            { ...condition, slug: Like(`%${searchText}%`) },
            { ...condition, brand: Like(`%${searchText}%`) },
          ]
        : condition,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      dataList: productList.map((product) => ({
        ...product,
        createdAt: dayjs(product.createdAt).utc(true).toISOString(),
      })),
      totalRecord: total,
      totalPage:
        total % pageSize === 0
          ? total / pageSize
          : Math.floor(total / pageSize) + 1,
    };
  }

  async batchUpdateProductStatus(payload: BatchUpdateStatusDto) {
    try {
      const { ids, status } = payload;
      return await this.productRepository.save(
        ids.map((id) => ({ id, productStatus: status })),
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException('An error occurred');
    }
  }
}
