import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from '../products/products.entity';
import { ProductAttributeGroupItemEntity } from './product-attribute-group-items.entity';
import { ProductSkuEntity } from '../products/product-skus.entity';

@Entity('product_attribute_groups')
export class ProductAttributeGroupEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
  })
  productId: number;

  @ManyToOne(() => ProductEntity, {
    cascade: true,
  })
  product?: ProductEntity;

  @OneToMany(
    () => ProductAttributeGroupItemEntity,
    (item) => item.attributeGroup,
  )
  items?: ProductAttributeGroupItemEntity[];

  @Column({
    nullable: true,
    type: 'nvarchar',
  })
  sku?: string;

  // relationships
  @OneToOne(() => ProductSkuEntity, (s) => s.variant, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'sku',
  })
  productSku?: ProductEntity;
}
