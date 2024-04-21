import { useProductContext } from './useProductContext.ts';
import useSWR from 'swr';
import { productDetailService } from '../product-detail-service.ts';
import { handleActionError } from '../../_shared/helper.ts';

export const useSkuInventoryList = () => {
  const { product } = useProductContext();

  const { data, isLoading, mutate } = useSWR(
    [product.id, 'sku-inventory'],
    async ([productId]) => {
      try {
        return await productDetailService.getAllSkuInventory(productId);
      } catch (error) {
        handleActionError(error);
      }
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  return {
    skuInventoryList: data,
    refresh: mutate,
    isLoading,
  };
};
