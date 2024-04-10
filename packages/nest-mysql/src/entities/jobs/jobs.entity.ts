import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base.entity';

export enum JobAction {
  import_inventory_sku = 'import_inventory_sku',
}

export enum JbStatus {
  pending = 'pending',
  processing = 'processing',
  completed = 'completed',
  failed = 'failed',
  canceled = 'canceled',
}

@Entity('jobs')
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: true,
    type: 'nvarchar',
    length: 255,
  })
  title?: string;

  @Column({
    enum: JbStatus,
    default: JbStatus.pending,
    nullable: true,
    type: 'enum',
  })
  status: JbStatus;

  @Column({
    type: 'enum',
    enum: JobAction,
  })
  action: JobAction;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  @Index({
    nullFiltered: true,
  })
  target?: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  source?: string;

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
  })
  totalTask: number;

  @Column({
    type: 'int',
    nullable: true,
    default: 0,
  })
  completedTask: number;

  @Column({
    nullable: true,
    type: 'int',
    default: 0,
  })
  failedTask?: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  executedAt?: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  completedAt?: number;
}
