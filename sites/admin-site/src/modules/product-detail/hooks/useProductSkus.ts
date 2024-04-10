import { useErrorHandler } from 'modules/_shared/hooks';
import { useState } from 'react';
import { productDetailService } from '../product-detail-service';
import { useProductContext } from './useProductContext';
import { message } from 'antd';
import useSWR from 'swr';
import { IUpsertSkuFormType } from '../types/product-skus';
import { ISeoInfo } from 'modules/seo-info/types';

export const useProductSkus = () => {
  const { handleActionError } = useErrorHandler();
  const { product } = useProductContext();
  const [actionLoading, setLoading] = useState<boolean>(false);

  const { data, isLoading, mutate } = useSWR(
    [product.id, 'skus'],
    async ([productId]) => {
      const response = await productDetailService.getAllSkus(productId);
      return response.items;
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  const createSku = async (sku: IUpsertSkuFormType) => {
    try {
      setLoading(true);
      await productDetailService.createSku(product.id, sku);
      message.success('Variant saved successfully');
    } catch (e) {
      handleActionError(e);
      throw e;
    } finally {
      setLoading(false);
      mutate();
    }
  };

  const updateSku = async (productSku: IUpsertSkuFormType) => {
    try {
      setLoading(true);
      await productDetailService.updateSku(
        product.id,
        productSku.sku,
        productSku,
      );
      message.success('Variant updated successfully');
    } catch (e) {
      handleActionError(e);
      throw e;
    } finally {
      setLoading(false);
      mutate();
    }
  };

  const updateSkuSeo = async (sku: string, seoInfo: ISeoInfo) => {
    try {
      setLoading(true);
      await productDetailService.updateSkuSeo(product.id, sku, seoInfo);
      message.success('SEO info updated successfully');
    } catch (e) {
      handleActionError(e);
      throw e;
    } finally {
      setLoading(false);
      mutate();
    }
  };

  return {
    productSkus: data,
    actionLoading,
    setLoading,
    updateSku,
    loading: isLoading,
    refresh: mutate,
    createSku,
    updateSkuSeo,
  };
};
