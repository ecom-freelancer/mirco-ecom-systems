import { useErrorHandler } from 'modules/_shared/hooks';
import { useState } from 'react';
import { productDetailService } from '../product-detail-service';
import { useProductContext } from './useProductContext';
import { IVariant } from '../types.ts/variant';
import { message } from 'antd';
import useSWR from 'swr';

export const useVariants = () => {
  const { handleActionError } = useErrorHandler();
  const { product, refresh } = useProductContext();
  const [actionLoading, setLoading] = useState<boolean>(false);

  const { data, isLoading, mutate } = useSWR(
    [product.id, 'variants'],
    async ([productId]) => {
      const response = await productDetailService.getAllVariants(productId);
      return response.variants;
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  const upsertVariant = async (variant: IVariant) => {
    try {
      setLoading(true);
      await productDetailService.upsertVariant(product.id, variant);
      message.success('Variant saved successfully');
    } catch (e) {
      handleActionError(e);
    } finally {
      setLoading(false);
      refresh();
    }
  };

  return {
    variants: data,
    actionLoading,
    setLoading,
    upsertVariant,
    loading: isLoading,
    refresh: mutate,
  };
};
