import useSWR from 'swr';
import { productDetailService } from '../product-detail-service.ts';

export const useSkuInventoryDetail = (sku: string | undefined) => {
  const { data, isLoading, mutate } = useSWR(
    [sku, 'sku-inventory-detail'],
    ([sku]) => {
      if (!sku) return null;
      return productDetailService.getSkuInventoryDetail(sku);
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
