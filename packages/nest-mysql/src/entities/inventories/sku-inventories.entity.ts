import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sku_inventories')
export class SkuInventoriesEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'sku',
    type: 'varchar',
  })
  sku: string;

  @Column({
    default: 0,
    nullable: true,
    type: 'int',
  })
  totalVolume: number;

  @OneToOne(() => SkuInventoriesEntity)
  @JoinColumn({
    name: 'sku',
  })
  skuInventory?: SkuInventoriesEntity;
}
