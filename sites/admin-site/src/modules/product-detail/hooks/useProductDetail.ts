import useSWR from 'swr';
import { productDetailService } from '../product-detail-service';
import { message } from 'antd';
import { useState } from 'react';
import { IUpdateProductPayload } from '../types';
import { handleActionError } from '../../_shared/helper.ts';

export const useProductDetail = (id: string | number) => {
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
