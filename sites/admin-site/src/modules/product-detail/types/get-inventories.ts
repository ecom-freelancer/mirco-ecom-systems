import {
  ISKuInventoryStatistic,
  ISkuEntity,
  InventoryStatus,
} from './inventory';

export interface IGetListInventoryQueries {
  sku?: string;

  page?: number;

  pageSize?: number;

  status?: InventoryStatus;
}

export type IGetListInventoryResponse = {
  total: number;
  items: ISkuEntity[];
  statistic?: ISKuInventoryStatistic;
};
