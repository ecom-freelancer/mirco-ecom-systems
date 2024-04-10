import useSWR from 'swr';
import { productDetailService } from '../product-detail-service';
import { useErrorHandler } from 'modules/_shared/hooks';
import { message } from 'antd';
import { useState } from 'react';
import { IUpdateProductPayload } from '../types/index.ts';

export const useProductDetail = (id: string | number) => {
  const { handleActionError } = useErrorHandler();
  const [actionLoading, setLoading] = useState(false);
  const {
    data: product,
    isLoading,
    mutate,
  } = useSWR(
    [id, 'product-detail'],
    ([id]) => {
      return productDetailService.getProductDetail(id);
    },
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

  const updateProduct = async (payload: IUpdateProductPayload) => {
    try {
      setLoading(true);
      await productDetailService.updateProduct(product.id, payload);
      await mutate();
      message.success('Update product successfully');
    } catch (error) {
      handleActionError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    product,
    isLoading,
    updateProduct,
    actionLoading,
    refresh: mutate,
  };
};
