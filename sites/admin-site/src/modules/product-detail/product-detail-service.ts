import appApi from 'configs/fetchers/app-api';
import { ID } from 'modules/_shared/types';
import { IProductInfoFormType } from 'modules/products/types';
import {
  IGetListVariantsResponse,
  IUpsertVariantPayload,
} from './types.ts/variant';

export const productDetailService = {
  getProductDetail: async (id: ID) => {
    return appApi.get(`/products/${id}`).then((res) => res.data);
  },

  updateProduct: async (id: ID, product: IProductInfoFormType) => {
    return appApi.post(`/products/${id}`, product).then((res) => res.data);
  },

  upsertVariant: async (productId: ID, variant: IUpsertVariantPayload) => {
    return appApi
      .post(`/products/${productId}/variants`, variant)
      .then((res) => res.data);
  },
  getAllVariants: async (productId: ID) => {
    return appApi
      .get<IGetListVariantsResponse>(`/products/${productId}/variants`)
      .then((res) => res.data);
  },
};
