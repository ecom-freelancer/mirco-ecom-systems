import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  createdAt?: string;

  @DeleteDateColumn()
  detatedAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;
}
