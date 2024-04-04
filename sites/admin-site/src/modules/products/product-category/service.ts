import appApi from 'configs/fetchers/app-api';
import { IProductCategory } from './types';

export const categoryService = {
  getAllCategories: async () => {
    return appApi
      .get<{
        categories: IProductCategory[];
      }>('/categories')
      .then((res) => res.data.categories);
  },

  changeCategoryDisplay: async (id: number, display: boolean) => {
    return appApi.put(`/categories/${id}/display`, { display }).then();
  },
};
