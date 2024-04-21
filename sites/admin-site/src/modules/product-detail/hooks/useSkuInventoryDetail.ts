import useSWR from 'swr';
import { productDetailService } from '../product-detail-service.ts';

export const useSkuInventoryDetail = (skuInventoryId: number | undefined) => {
  const { data, isLoading, mutate } = useSWR(
    [skuInventoryId, 'sku-inventory-detail'],
    ([skuInventoryId]) => {
      if (!skuInventoryId) return null;
      return productDetailService.getSkuInventoryDetail(skuInventoryId);
    },
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

  return {
    skuInventoryDetail: data,
    isLoading,
    refresh: mutate,
  };
};
