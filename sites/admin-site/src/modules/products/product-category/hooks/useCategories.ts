import useSWR from 'swr';
import { IProductCategory } from '../types';
import { categoryService } from '../service';

export const useCategories = () => {
  const { data: categories, isLoading } = useSWR(
    '/categories',
    categoryService.getAllCategories,
    {
      revalidateIfStale: true,
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );
  return {
    categories: categories || ([] as IProductCategory[]),
    loading: isLoading,
  };
};
