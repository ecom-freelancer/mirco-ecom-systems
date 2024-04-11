import { productService } from '../services';
import { useEffect, useState } from 'react';
import { GetListProductParams, IProductInfoFormType } from '../types';

export const useGetListProduct = (params: GetListProductParams) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProductInfoFormType[]>([]);
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
      } catch (_) {
      } finally {
        setLoading(false);
      }
    };

    fetchProduct().then();
  }, [params]);

  return {
    loading,
    products,
    totalPage,
    totalRecord,
  };
};
