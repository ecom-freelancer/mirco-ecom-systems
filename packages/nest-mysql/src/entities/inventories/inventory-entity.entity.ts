import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { SkuInventoriesEntity } from './sku-inventories.entity';
import { JobEntity } from '../jobs/jobs.entity';

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
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value,
    },
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
  @Index()
  status: InventoryStatus;

  @Column({
    name: 'sku_inventory_id',
    type: 'int',
  })
  skuInventoryId: number;

  @Column({
    name: 'job_id',
    type: 'int',
    nullable: true,
  })
  jobId: number;

  @ManyToOne(() => SkuInventoriesEntity, {
    cascade: true,
  })
  @JoinColumn({ name: 'sku_inventory_id' })
  skuInventory?: SkuInventoriesEntity;

  @ManyToOne(() => JobEntity, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'job_id' })
  job?: JobEntity;
}
