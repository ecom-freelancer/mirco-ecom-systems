import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { SkuInventoriesEntity } from './sku-inventories.entity';

export enum InventoryStatus {
  enable = 'enable',
  disable = 'disable',
  draft = 'draft',
  sold = 'sold',
}

@Entity('inventory_entities')
export class InventoryEntityEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // The encoded value of card
  @Column({
    type: 'text',
  })
  barCode: string;

  // The hashKey that auto-generated in Backend service
  @Column({
    nullable: true,
    default: '',
    type: 'varchar',
  })
  hashKey: string;

  @Column({
    type: 'enum',
    enum: InventoryStatus,
    default: InventoryStatus.draft,
  })
  status: InventoryStatus;

  @Column({
    name: 'sku_inventory_id',
    type: 'int',
  })
  skuInventoryId: number;

  @ManyToOne(
    () => SkuInventoriesEntity,
    (skuInventory) => skuInventory.inventoryEntities,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'sku_inventory_id' })
  skuInventory?: SkuInventoriesEntity;
}
