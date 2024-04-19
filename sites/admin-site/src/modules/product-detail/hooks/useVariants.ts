import { useState } from 'react';
import { productDetailService } from '../product-detail-service';
import { useProductContext } from './useProductContext';
import { IVariant } from '../types/variant';
import { message } from 'antd';
import useSWR from 'swr';
import { handleActionError } from '../../_shared/helper.ts';

export const useVariants = () => {
  const { product } = useProductContext();
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
      mutate();
    }
  };

  const deleteVariant = async (variantId: number) => {
    try {
      setLoading(true);
      await productDetailService.deleteVariant(product.id, variantId);
      message.success('Variant deleted successfully');
    } catch (e) {
      handleActionError(e);
      throw e;
    } finally {
      setLoading(false);
      mutate();
    }
  };

  return {
    variants: data,
    actionLoading,
    setLoading,
    upsertVariant,
    loading: isLoading,
    refresh: mutate,
    deleteVariant,
  };
};
