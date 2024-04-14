// From get list
import { InventoryStatus } from '@packages/nest-mysql';

export interface ISkuInventoryDto {
  id: number;
  sku: string;
  totalVolume: number;
  totalAvailable: number;
  soldQuantity: number;
}

export interface ISkuInventoryDetail extends ISkuInventoryDto {
  countDetail: Record<InventoryStatus, number>;
}

export type IGetSkuInventoryListResponse = ISkuInventoryDetail[];

export interface IGetInventoryEntityListParams {
  sku?: string;
  page?: number;
  pageSize?: number;
  status?: InventoryStatus[];
}

export interface IInventoryEntity {
  id: number;
  barCode: string;
  status: InventoryStatus;
  createdAt: Date;
  updatedAt: Date;
  skuInventoryId: number;
  sku: string;
}

export interface IGetInventoryEntityListResponse {
  dataList: IInventoryEntity[];
  totalPage: number;
  totalRecord: number;
}
