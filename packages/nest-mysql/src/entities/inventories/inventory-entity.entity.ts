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
  draft = 'draft',
  sold = 'sold',
}

@Entity('inventory_entities')
export class InventoryEntityEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'text',
  })
  barCode: string;

  @Column({
    nullable: true,
    default: '',
    type: 'varchar',
  })
  hasKey: string;

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

  @ManyToOne(() => SkuInventoriesEntity, {
    cascade: true,
  })
  @JoinColumn({ name: 'sku_inventory_id' })
  skuInventory?: SkuInventoriesEntity;
}
