import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSkuEntity } from '../products/product-skus.entity';

@Entity('sku_inventories')
export class SkuInventoriesEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'sku',
    type: 'varchar',
  })
  sku: string;

  @Column({
    default: 0,
    nullable: true,
    type: 'int',
  })
  totalVolume: number;

  @OneToOne(() => ProductSkuEntity, (s) => s.inventory, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'sku',
  })
  productSku?: ProductSkuEntity;
}
