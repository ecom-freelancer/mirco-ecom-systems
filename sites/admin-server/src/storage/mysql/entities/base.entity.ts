import { CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn()
  createAt: Date;
}
