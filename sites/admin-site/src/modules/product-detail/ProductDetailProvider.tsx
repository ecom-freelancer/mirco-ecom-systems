import { ID } from 'modules/_shared/types';
import { useProductDetail } from './hooks/useProductDetail';
import { LoadingScreen } from 'modules/_shared/components/LoadingScreen';
import { ProductDetailContext } from './product-detail-context';

export interface IProductDetailProviderProps {
  children: React.ReactNode;
  productId: ID;
}

export const ProductDetailProvider: React.FC<IProductDetailProviderProps> = ({
  children,
  productId,
}) => {
  const { isLoading, product, actionLoading, updateProduct, refresh } =
    useProductDetail(productId);

  if (isLoading) return <LoadingScreen />;

  return (
    <ProductDetailContext.Provider
      value={{
        refresh: refresh,
        product,
        loading: isLoading,
        updating: actionLoading,
        onUpdateProduct: updateProduct,
      }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
};
