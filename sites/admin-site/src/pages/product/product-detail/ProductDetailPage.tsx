import { Box, styled } from '@packages/ds-core';
import { ProductInfoForm } from 'modules/products';
import { useProductDetail } from 'modules/products/hooks';
import React from 'react';
import { useParams } from 'react-router';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, product } = useProductDetail(id!);

  return (
    <Wrapper margin="s16">
      {isLoading ? 'Loading...' : <ProductInfoForm initialValues={product} />}
    </Wrapper>
  );
};

const Wrapper = styled(Box)``;

export default ProductDetailPage;
