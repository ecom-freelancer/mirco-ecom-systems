import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSkuEntity } from '../products/product-skus.entity';
import { InventoryEntityEntity } from './inventory-entity.entity';

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

  // I don't know we should config a job to auto update this value
  // or let user config these by handed
  @Column({
    default: 0,
    nullable: true,
    type: 'int',
  })
  totalAvailable: number;

  @Column({
    default: 0,
    nullable: true,
    type: 'int',
  })
  soldQuantity: number;

  @OneToOne(() => ProductSkuEntity)
  @JoinColumn({
    name: 'sku',
  })
  productSku?: ProductSkuEntity;

  @OneToMany(
    () => InventoryEntityEntity,
    (inventoryEntity) => inventoryEntity.skuInventory,
  )
  inventoryEntities: InventoryEntityEntity[];
}
