import React from 'react';
import { useProductSkus } from '../../../modules/product-detail/hooks';
import ProductSkuInventoryList from '../../../modules/product-detail/components/ProductSkuInventoryList.tsx';

export interface ProductInventoryPageProps {}

const ProductInventoryPage: React.FC<ProductInventoryPageProps> = () => {
  const { productSkus } = useProductSkus();
  return <ProductSkuInventoryList productSkus={productSkus} />;
};

export default ProductInventoryPage;
