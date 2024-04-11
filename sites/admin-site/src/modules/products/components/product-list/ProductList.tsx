import { GetListProductParams, IProductInfo } from '../../types';
import React from 'react';

export interface ProductListProps {
  params: GetListProductParams;
  setParams: (payload: GetListProductParams) => void;
  products: IProductInfo[];
  loading: boolean;
  totalPage: number;
  totalRecord: number;
}

const ProductList: React.FC<ProductListProps> = ({
  params,
  setParams,
  products,
  loading,
  totalPage,
  totalRecord,
}) => {
  console.log({
    params,
    setParams,
    products,
    loading,
    totalPage,
    totalRecord,
  });
  return <h1>ProductListProps</h1>;
};

export default ProductList;
