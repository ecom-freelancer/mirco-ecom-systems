import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ProductAttributeGroupEntity } from './product-attribute-groups.entity';
import { ProductAttributeEntity } from './product-attributes.entity';
import { ProductAttributeOptionEntity } from './product-attribute-options.entity';

@Entity('product_attribute_group_items')
@Unique(['attributeGroupId', 'attributeId'])
export class ProductAttributeGroupItemEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'attribute_group_id',
    type: 'int',
  })
  attributeGroupId: number;

  @Column({
    name: 'attribute_id',
    type: 'int',
  })
  attributeId: number;

  @Column({
    name: 'attribute_option_id',
    type: 'int',
  })
  attributeOptionId: number;

  // relationships
  @ManyToOne(() => ProductAttributeGroupEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  attributeGroup?: ProductAttributeGroupEntity;

  @ManyToOne(() => ProductAttributeEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  attribute?: ProductAttributeEntity;

  @ManyToOne(() => ProductAttributeOptionEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  attributeOption?: ProductAttributeOptionEntity;
}
