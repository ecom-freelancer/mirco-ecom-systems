import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt?: number;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt?: number;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt?: number;
}
