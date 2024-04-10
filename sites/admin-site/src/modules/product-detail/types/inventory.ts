import { ID } from 'modules/_shared/types';

export enum InventoryStatus {
  enable = 'enable',
  sold = 'sold',
  draft = 'draft',
}

export interface ISkuInventory {
  volume: number;
  sku: string;
  id: ID;
}

export type ISKuInventoryStatistic = Array<{
  status: InventoryStatus;
  total: number;
}>;

export interface ISkuEntity {
  id: ID;
  barCode: string;
  status: InventoryStatus;
  createAt?: string;
}
