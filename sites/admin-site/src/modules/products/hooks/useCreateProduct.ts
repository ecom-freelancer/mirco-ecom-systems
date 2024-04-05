import { useState } from 'react';
import { productService } from '../services';
import { ICreateProductPayload } from '../types';
import { useErrorHandler } from 'modules/_shared/hooks';
import { message } from 'antd';

export const useProductAction = () => {
  const [loading, setLoading] = useState(false);
  const { handleActionError } = useErrorHandler();

  const createProduct = async (
    payload: ICreateProductPayload,
    callBack: (id: number) => void,
  ) => {
    try {
      setLoading(true);
      const response = await productService.createProduct(payload);
      callBack(response.id);
      message.success('Create product successfully');
    } catch (e) {
      handleActionError(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    loading,
  };
};
