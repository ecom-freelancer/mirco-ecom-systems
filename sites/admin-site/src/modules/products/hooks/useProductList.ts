import { productService } from '../services';
import { useEffect, useState } from 'react';
import { GetListProductParams, IProductInfo } from '../types';
import {
  handleActionError,
  handleActionSuccess,
} from '../../_shared/helper.ts';
import { ProductStatus } from 'configs/constants/product.ts';

export const useProductList = (params: GetListProductParams) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProductInfo[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getListProducts(params);
        setProducts(response.dataList);
        setTotalPage(response.totalPage);
        setTotalRecord(response.totalRecord);
      } catch (e) {
        handleActionError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct().then();
  }, [params]);

  const batchUpdateProductStatus = async (
    ids: number[],
    status: ProductStatus,
  ) => {
    try {
      setLoading(true);
      await productService.batchUpdateProductStatus(ids, status);
      handleActionSuccess('Update product status successfully!');
    } catch (e) {
      handleActionError(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    products,
    totalPage,
    totalRecord,
    batchUpdateProductStatus,
  };
};
