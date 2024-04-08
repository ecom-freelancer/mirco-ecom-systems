import { Page } from 'modules/_shared/components/Page';
import { useProductContext } from 'modules/product-detail/hooks/useProductContext';
import { ProductInfoForm } from 'modules/products';
import React from 'react';

const ProductInfoPage: React.FC = () => {
  const { product, updating, onUpdateProduct } = useProductContext();

  return (
    <Page>
      <ProductInfoForm
        initialValues={product as every}
        loading={updating}
        onSubmit={onUpdateProduct}
      />
    </Page>
  );
};

export default ProductInfoPage;
