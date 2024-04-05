import useSWR from 'swr';
import { productService } from '../services';

export const useProductDetail = (id: string | number) => {
  const { data: product, isLoading } = useSWR(
    [id, 'product-detail'],
    ([id]) => {
      return productService.getProductDetail(id);
    },
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );
  return {
    product,
    isLoading,
  };
};
