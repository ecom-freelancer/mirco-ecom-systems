// From get list
import { InventoryStatus } from 'configs/constants/inventory';

export interface ISkuInventoryDto {
  id: number;
  sku: string;
  totalVolume: number;
  totalAvailable: number;
  soldQuantity: number;
  productSku: {
    sku: string;
    name: string;
  };
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
  startDate?: string;
  endDate?: string;
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

export type IUpsertInventoryEntityFormType = Omit<
  IInventoryEntity,
  'createdAt' | 'updatedAt' | 'sku' | 'id'
> & { id: number | null };

export type ICreateInventoryEntityPayload = Omit<
  IUpsertInventoryEntityFormType,
  'id'
>;

export type IUpdateInventoryEntityPayload = IUpsertInventoryEntityFormType;
