import appApi from 'configs/fetchers/app-api';
import {
  GetListProductParams,
  GetListProductResponse,
  ICreateProductPayload,
} from '../types';
import { IUpsertResponse } from 'modules/_shared/types';

export const productService = {
  createProduct: async (product: ICreateProductPayload) => {
    return appApi
      .post<IUpsertResponse>('/products', product)
      .then((res) => res.data);
  },

  getListProducts: async (params: GetListProductParams) => {
    return appApi
      .get<GetListProductResponse>('/products', { params: params })
      .then((res) => res.data);
  },
};
