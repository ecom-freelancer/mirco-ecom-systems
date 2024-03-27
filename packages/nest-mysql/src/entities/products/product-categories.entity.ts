import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SeoInfoEntity } from '../seo-info.entity';

@Entity('product_categories')
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'nvarchar',
    length: 255,
  })
  name: string;

  @Column({
    unique: true,
    length: 24,
    type: 'varchar',
  })
  code: string;

  @Column({
    nullable: false,
    type: 'double',
  })
  order?: number;

  @Column({
    nullable: true,
    type: 'text',
  })
  image?: string;

  @Column({
    nullable: true,
    default: false,
    type: 'bool',
  })
  display?: boolean;

  @Column({ nullable: true, name: 'seo_info_id', type: 'int' })
  seoInfoId?: number;

  @Column({ nullable: true, name: 'parent_id', type: 'int' })
  parentId?: number;

  @OneToMany(() => ProductCategoryEntity, (category) => category.parent)
  @JoinColumn()
  items?: ProductCategoryEntity[];

  // relationships
  @ManyToOne(() => SeoInfoEntity)
  @JoinColumn({
    name: 'seo_info_id',
  })
  seoInfo?: SeoInfoEntity;

  @ManyToOne(() => ProductCategoryEntity, (p) => p.items)
  @JoinColumn({
    name: 'parent_id',
  })
  parent?: ProductCategoryEntity;
}
