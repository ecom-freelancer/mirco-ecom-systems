import { IGetInventoryEntityListParams } from '../types';
import useSWR from 'swr';
import { productDetailService } from '../product-detail-service.ts';

export const useInventoryEntityList = (
  sku: string | undefined,
  params: IGetInventoryEntityListParams,
) => {
  const { data, isLoading, mutate } = useSWR(
    [sku, 'inventory-entity-list'],
    ([sku]) => {
      if (!sku)
        return {
          dataList: [],
          totalPage: 0,
          totalRecord: 0,
        };

      return productDetailService.getInventoryEntityList({ ...params, sku });
    },
    {
      revalidateOnMount: true,
    },
  );

  return {
    inventoryEntityList: data?.dataList || [],
    totalPage: data?.totalPage || 0,
    totalRecord: data?.totalRecord || 0,
    isLoading,
    refresh: mutate,
  };
};
