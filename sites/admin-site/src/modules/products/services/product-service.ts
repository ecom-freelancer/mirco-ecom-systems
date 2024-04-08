import appApi from 'configs/fetchers/app-api';
import { ICreateProductPayload } from '../types';
import { IUpsertResponse } from 'modules/_shared/types';

export const productService = {
  createProduct: async (product: ICreateProductPayload) => {
    return appApi
      .post<IUpsertResponse>('/products', product)
      .then((res) => res.data);
  },
};
