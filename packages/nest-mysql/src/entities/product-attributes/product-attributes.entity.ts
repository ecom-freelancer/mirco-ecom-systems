import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { ProductEntity } from '../products/products.entity';
import { ProductAttributeOptionEntity } from './product-attribute-options.entity';

@Entity('product_attributes')
export class ProductAttributeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'nvarchar',
  })
  name: string;

  @Column({
    default: 0,
    type: 'double',
  })
  order: number;

  @Column({
    default: true,
    type: 'bool',
  })
  showNameInConsumer?: boolean;

  @Column({
    name: 'product_id',
    type: 'int',
  })
  productId: number;

  @OneToMany(() => ProductAttributeOptionEntity, (option) => option.attribute)
  options: ProductAttributeOptionEntity[];

  @ManyToOne(() => ProductEntity, (product) => product.attributes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'product_id',
  })
  product: ProductEntity;
}
