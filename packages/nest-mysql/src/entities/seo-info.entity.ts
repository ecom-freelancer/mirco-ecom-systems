import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ArrayStringTransformer } from '../helpers/array-string-transformer';

@Entity('seo_infos')
export class SeoInfoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: true,
    type: 'nvarchar',
  })
  title?: string;

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
    transformer: ArrayStringTransformer,
    type: 'text',
    nullable: true,
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
}
