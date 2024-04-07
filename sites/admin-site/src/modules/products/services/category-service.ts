import appApi from 'configs/fetchers/app-api';
import {
  IProductCategory,
  IReorderCategoryPayload,
  IUpsertCategoryFormValues,
} from '../types';

export const categoryService = {
  getAllCategories: async () => {
    return appApi
      .get<{
        categories: IProductCategory[];
      }>('/categories')
      .then((res) => res.data.categories);
  },

  getCategoryDetail: async (id: string | number) => {
    return appApi
      .get<IProductCategory>(`/categories/${id}`)
      .then((res) => res.data);
  },

  changeCategoryDisplay: async (id: number, display: boolean) => {
    return appApi.put(`/categories/${id}/display`, { display }).then();
  },

  upsertCategory: async (payload: IUpsertCategoryFormValues) => {
    return appApi.post(`/categories`, payload);
  },

  reorderCategory: async (payload: IReorderCategoryPayload) => {
    return appApi.post(`/categories/reorder`, payload);
  },
};
