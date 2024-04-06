import useSWR from 'swr';

import { categoryService } from '../services';

export const useCategoryDetail = (id: string | number | undefined) => {
  const {
    data: category,
    isLoading,
    error,
  } = useSWR(
    [id, 'category-detail'],
    ([id]) => {
      return categoryService.getCategoryDetail(id || '');
    },
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

  if (!id || !category)
    return {
      category: null,
      isLoading: false,
      error,
    };

  return {
    category,
    isLoading,
    error: null,
  };
};
