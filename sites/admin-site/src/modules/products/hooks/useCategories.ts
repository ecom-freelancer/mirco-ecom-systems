import useSWR from 'swr';

import { categoryService } from '../services';
import { IProductCategory } from '../types';

export const useCategories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useSWR('/categories', categoryService.getAllCategories, {
    revalidateIfStale: true,
    keepPreviousData: true,
    revalidateOnFocus: false,
  });
  return {
    categories: categories || ([] as IProductCategory[]),
    loading: isLoading,
    error,
  };
};
