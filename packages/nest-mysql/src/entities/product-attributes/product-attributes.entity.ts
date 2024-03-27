import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base.entity';

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
  showNameInContent?: boolean;
}
