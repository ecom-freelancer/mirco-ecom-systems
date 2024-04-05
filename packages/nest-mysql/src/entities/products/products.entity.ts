import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { SeoInfoEntity } from '../seo-info.entity';
import { ProductCategoryEntity } from './product-categories.entity';
import { ProductAttributeEntity } from '../product-attributes/product-attributes.entity';
import { ProductSkuEntity } from './product-skus.entity';
import { ProductAttributeGroupEntity } from '../product-attributes/product-attribute-groups.entity';
import { ArrayStringTransformer } from '../../helpers/array-string-transformer';

export enum ProductStatus {
  draft = 'draft',
  published = 'published',
  hide = 'hide',
}

export enum ProductDeliveryType {
  online_by_email = 'online_by_email',
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
    transformer: ArrayStringTransformer,
    nullable: true,
    type: 'text',
  })
  images?: Array<string>;

  @Column({
    type: 'nvarchar',
    length: 255,
    nullable: true,
  })
  brand?: string;

  @Column({
    nullable: true,
    transformer: ArrayStringTransformer,
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

  // relationships
  @OneToOne(() => SeoInfoEntity, {
    nullable: true,
    cascade: true,
    orphanedRowAction: 'soft-delete',
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

  @OneToMany(() => ProductAttributeEntity, (attribute) => attribute.product)
  attributes?: Array<ProductAttributeEntity>;

  @OneToMany(() => ProductSkuEntity, (sku) => sku.product)
  skus?: Array<ProductSkuEntity>;

  @OneToMany(() => ProductAttributeGroupEntity, (variant) => variant.product)
  variants?: Array<ProductAttributeGroupEntity>;
}
