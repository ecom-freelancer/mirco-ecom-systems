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
};
