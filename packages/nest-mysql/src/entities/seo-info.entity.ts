import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('seo_infos')
export class SeoInfoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
    type: 'nvarchar',
  })
  title: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  shortDescription: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  image?: string;

  @Column({
    transformer: {
      to: (value?: Array<string>) => value?.join(',') || '',
      from: (value?: string) => value?.split(',') || [],
    },
    type: 'text',
  })
  keywords?: Array<string>;

  @Column({
    nullable: true,
    default: false,
    type: 'bool',
  })
  noIndex?: boolean;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  canonical?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
