import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base.entity';

export enum TaskStatus {
  pending = 'pending',
  processing = 'processing',
  completed = 'completed',
  failed = 'failed',
}

@Entity()
export class JobTasksEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
  })
  jobId: number;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.pending,
    nullable: true,
  })
  status: TaskStatus;

  @Column({
    transformer: {
      to: (value) => {
        try {
          return JSON.parse(value);
        } catch {
          return undefined;
        }
      },
      from: (value: string) => {
        try {
          return JSON.stringify(value);
        } catch {
          return '';
        }
      },
    },
    nullable: true,
    type: 'text',
  })
  source?: any;

  @Column({
    type: 'text',
    nullable: true,
  })
  message?: string;
}
