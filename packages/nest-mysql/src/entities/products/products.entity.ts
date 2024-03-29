import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { SeoInfoEntity } from '../seo-info.entity';
import { ProductCategoryEntity } from './product-categories.entity';

export enum ProductStatus {
  draft = 'draft',
  published = 'published',
  hide = 'hide',
}

export enum ProductDeliveryType {
  only_by_email = 'only_by_email',
}

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    unique: true,
    length: 50,
    type: 'varchar',
  })
  slug: string;

  @Column({
    type: 'nvarchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  userManual?: string;

  @Column({
    transformer: {
      to: (value?: Array<string>) => value?.join(',') || '',
      from: (value?: string) => value?.split(',') || [],
    },
    nullable: true,
    type: 'text',
  })
  images?: Array<string>;

  @Column({
    type: 'nvarchar',
    length: 255,
  })
  brand?: string;

  @Column({
    nullable: true,
    transformer: {
      to: (value?: Array<string>) => value?.join(',') || '',
      from: (value?: string) => value?.split(',') || [],
    },
    type: 'nvarchar',
  })
  keywords?: Array<string>;

  @Column({
    type: 'enum',
    enum: ProductDeliveryType,
  })
  deliveryType?: ProductDeliveryType;

  @Column({
    nullable: true,
    default: ProductStatus.draft,
    type: 'enum',
    enum: ProductStatus,
  })
  productStatus?: ProductStatus;

  @Column({
    name: 'seo_info_id',
    type: 'int',
    nullable: true,
  })
  seoInfoId?: number;

  @Column({
    name: 'category_id',
    nullable: true,
    type: 'int',
  })
  categoryId?: number;

  // releation_ships

  @ManyToOne(() => SeoInfoEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'seo_info_id',
  })
  seoInfo?: SeoInfoEntity;

  @ManyToOne(() => ProductCategoryEntity, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category?: ProductCategoryEntity;
}
