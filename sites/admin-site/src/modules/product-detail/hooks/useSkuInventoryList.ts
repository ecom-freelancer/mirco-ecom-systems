import { useProductContext } from './useProductContext.ts';
import { useState } from 'react';
import useSWR from 'swr';
import { productDetailService } from '../product-detail-service.ts';

export const useSkuInventory = () => {
  const { product } = useProductContext();
  const [actionLoading, setLoading] = useState<boolean>(false);

  const { data, isLoading, mutate } = useSWR(
    [product.id, 'sku-inventory'],
    async ([productId]) => {
      return await productDetailService.getAllSkuInventory(productId);
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
    loading: isLoading,
    actionLoading,
    setLoading,
  };
};
