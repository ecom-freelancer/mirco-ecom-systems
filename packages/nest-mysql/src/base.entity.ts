import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  createdAt?: string;

  @DeleteDateColumn()
  deletedAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;
}
