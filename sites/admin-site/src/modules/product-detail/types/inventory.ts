// From get list
export interface ISkuInventoryDto {
  id: number;
  sku: string;
  totalVolume: number;
  totalAvailable: number;
  soldQuantity: number;
}

export interface ISkuInventoryDetail extends ISkuInventoryDto {
  countDetail: {
    draft: number;
    enable: number;
    disable: number;
    sold: number;
  };
}

export type IGetSkuInventoryListResponse = ISkuInventoryDetail[];
