import React from 'react';
import { useSkuInventory } from '../../../modules/product-detail/hooks/useSkuInventory.ts';

export interface ProductInventoryPageProps {
  className?: string;
}

const ProductInventoryPage: React.FC<ProductInventoryPageProps> = () => {
  const { skuInventoryList } = useSkuInventory();
  console.log(skuInventoryList);
  return <div>ProductInventoryPage</div>;
};

export default ProductInventoryPage;
