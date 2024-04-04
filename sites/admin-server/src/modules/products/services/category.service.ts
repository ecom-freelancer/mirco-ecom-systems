import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository, ProductCategoryEntity } from '@packages/nest-mysql';
import { IsNull, Not, Repository } from 'typeorm';
import { CategoryPayloadDto } from '../dtos/category.dto';
import { UpdateCategoryPayload } from '../interfaces/update-category.interface';
import { CreateCategoryPayload } from '../interfaces/create-category.interface';
import omit from 'lodash.omit';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private readonly categoryRepository: Repository<ProductCategoryEntity>,
  ) {}

  async getCategories() {
    return await this.categoryRepository.find({
      where: {
        parent: IsNull(),
      },
      relations: {
        items: {
          items: true,
        },
      },
    });
  }

  async importCategories(categories: CategoryPayloadDto[]) {
    await this.categoryRepository.upsert(categories, ['code']);
  }

  async createCategory(
    payload: CreateCategoryPayload,
  ): Promise<ProductCategoryEntity> {
    const code = payload.code;

    const isDuplicated =
      (await this.categoryRepository.countBy({
        code,
      })) > 0;

    if (isDuplicated) {
      throw new BadRequestException('Category code is duplicated');
    }

    return await this.categoryRepository.save(payload);
  }

  async updateCategory(
    payload: UpdateCategoryPayload,
  ): Promise<ProductCategoryEntity> {
    const { id, code } = payload;

    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        seoInfo: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Cannot find category with id = ${id}`);
    }

    const isDuplicated =
      (await this.categoryRepository.countBy({
        id: Not(id),
        code,
      })) > 0;

    if (isDuplicated) {
      throw new BadRequestException('Category code is duplicated');
    }

    if (!category.seoInfoId) {
      category.seoInfo = payload.seoInfo;
    } else {
      category.seoInfo = {
        ...category.seoInfo,
        ...omit(payload.seoInfo, 'id'),
      };
    }

    return await this.categoryRepository.save({
      ...category,
      ...payload,
      seoInfo: category.seoInfo,
    });
  }

  async changeCategoryDisplay(id: number, display: boolean) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Cannot find category with id = ${id}`);
    }

    return await this.categoryRepository.save({ ...category, display });
  }
}
