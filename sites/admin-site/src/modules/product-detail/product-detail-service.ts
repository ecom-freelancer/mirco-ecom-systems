import appApi from 'configs/fetchers/app-api';
import { ID } from 'modules/_shared/types';
import { IProductInfoFormType } from 'modules/products/types';
import {
  IGetListVariantsResponse,
  IUpsertVariantPayload,
} from './types/variant';
import { IGetListSkusResponse, IUpsertSkuFormType } from './types/product-skus';
import { ISeoInfo } from 'modules/seo-info/types';
import {
  IGetSkuInventoryListResponse,
  ISkuInventoryDetail,
  ISkuInventoryDto,
} from './types';

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

  deleteVariant: async (productId: ID, variantId: ID) => {
    return appApi
      .delete(`/products/${productId}/variants/${variantId}`)
      .then((res) => res.data);
  },
  getAllSkus: async (productId: ID) => {
    return appApi
      .get<IGetListSkusResponse>(`/products/${productId}/skus`)
      .then((res) => res.data);
  },

  createSku: async (productId: ID, skus: IUpsertSkuFormType) => {
    return appApi
      .post(`/products/${productId}/skus`, { ...skus })
      .then((res) => res.data);
  },
  updateSku: async (productId: ID, sku: ID, skus: IUpsertSkuFormType) => {
    return appApi
      .put(`/products/${productId}/skus/${sku}`, { ...skus })
      .then((res) => res.data);
  },

  updateSkuSeo: async (productId: ID, sku: ID, seoInfo: ISeoInfo) => {
    return appApi
      .post(`/products/${productId}/skus/${sku}/seo`, seoInfo)
      .then((res) => res.data);
  },

  getAllSkuInventory: async (productId: ID): Promise<ISkuInventoryDto[]> => {
    return appApi
      .get<ISkuInventoryDto[]>(`/sku-inventory`, {
        params: { productId },
      })
      .then((res) => res.data);
  },

  getSkuInventoryDetail: async (sku: string): Promise<ISkuInventoryDetail> => {
    return appApi
      .get<ISkuInventoryDetail>(`/sku-inventory/${sku}`)
      .then((res) => res.data);
  },
};
