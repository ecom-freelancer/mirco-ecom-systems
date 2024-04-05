import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { ProductAttributeEntity } from './product-attributes.entity';

@Entity('product_attribute_options')
@Unique(['name', 'attributeId'])
export class ProductAttributeOptionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'nvarchar',
  })
  name: string;

  @Column({
    default: 1,
    nullable: true,
    type: 'int',
  })
  amount?: number;

  @Column({
    nullable: true,
    type: 'double',
  })
  order?: number;

  @Column({
    name: 'attribute_id',
    type: 'int',
  })
  attributeId: number;

  @ManyToOne(() => ProductAttributeEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  attribute: ProductAttributeEntity;
}
