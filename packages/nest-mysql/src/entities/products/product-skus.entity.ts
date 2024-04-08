import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { SeoInfoEntity } from '../seo-info.entity';
import { ProductEntity } from './products.entity';
import { ProductAttributeGroupEntity } from '../product-attributes/product-attribute-groups.entity';
import { ArrayStringTransformer } from '../../helpers/array-string-transformer';

@Entity('product_skus')
export class ProductSkuEntity extends BaseEntity {
  @PrimaryColumn('varchar', { length: 100 })
  sku: string;

  @Column({
    nullable: false,
    length: 255,
    type: 'nvarchar',
  })
  name: string;

  @Column({
    nullable: true,
    type: 'text',
    transformer: ArrayStringTransformer,
  })
  images?: string[];

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
  })
  slug: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    nullable: true,
    default: false,
    type: 'boolean',
  })
  sellable?: boolean;

  @Column({
    type: 'double',
    default: 0,
  })
  sellPrice?: number;

  @Column({
    type: 'double',
    default: 0,
  })
  listPrice?: number;

  @Column({
    name: 'seo_info_id',
    type: 'int',
    nullable: true,
  })
  seoInfoId?: number;

  @Column({
    name: 'product_id',
    type: 'int',
  })
  productId?: number;

  @Column({
    name: 'variant_id',
    type: 'int',
    nullable: true,
  })
  variantId?: number;

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

  @ManyToOne(() => ProductEntity, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({
    name: 'product_id',
  })
  product?: ProductEntity;

  @OneToOne(() => ProductAttributeGroupEntity, (g) => g.productSku, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'variant_id',
  })
  variant?: ProductAttributeGroupEntity;
}
