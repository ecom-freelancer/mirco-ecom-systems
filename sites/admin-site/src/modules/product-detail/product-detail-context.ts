import React from 'react';
import { IProductDetail, IUpdateProductPayload } from './types/index.ts';

export interface IProductDetailContext {
  product: IProductDetail;
  loading?: boolean;
  updating?: boolean;
  onUpdateProduct?: (product: IUpdateProductPayload) => void;
  refresh: () => void;
}

export const ProductDetailContext = React.createContext<IProductDetailContext>({
  product: {} as IProductDetail,
  loading: false,
  refresh: () => {},
});
