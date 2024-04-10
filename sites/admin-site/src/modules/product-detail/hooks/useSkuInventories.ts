import useSWR from 'swr';
import { IGetListInventoryQueries } from '../types/get-inventories';
import { useProductContext } from './useProductContext';
import { productDetailService } from '../product-detail-service';

export const useSkuInventories = (
  sku: string,
  query?: IGetListInventoryQueries,
) => {
  const { product } = useProductContext();
  const { data, isLoading } = useSWR(
    [sku, query, product.id, 'inventories-sku'],
    () => {
      return productDetailService.getInventorySku(product.id, sku, query);
    },
    {
      keepPreviousData: true,
      revalidateIfStale: false,
    },
  );

  return {
    items: data?.items || [],
    total: data?.total || 0,
    statistic: data?.statistic || [],
    loading: isLoading,
  };
};
