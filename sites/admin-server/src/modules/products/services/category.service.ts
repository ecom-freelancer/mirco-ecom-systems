import { Injectable } from '@nestjs/common';
import { InjectRepository, ProductCategoryEntity } from '@packages/nest-mysql';
import { IsNull, Repository } from 'typeorm';
import { CategoryPayloadDto } from '../dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private readonly categoryRepo: Repository<ProductCategoryEntity>,
  ) {}

  async getCategories() {
    const categories = await this.categoryRepo.find({
      where: {
        parent: IsNull(),
      },
      relations: {
        items: {
          items: true,
        },
      },
    });

    return categories;
  }

  async upsertCategories(categories: CategoryPayloadDto[]) {
    await this.categoryRepo.upsert(categories, ['code']);
  }
}
