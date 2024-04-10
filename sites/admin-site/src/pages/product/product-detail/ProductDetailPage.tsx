import React, { Suspense } from 'react';
import { RouteObject, useParams, useRoutes } from 'react-router';

import { IRoute } from 'configs/router';
import { ID } from 'modules/_shared/types';
import { ProductDetailProvider } from 'modules/product-detail';
import { ProductDetailPageLayout } from 'modules/product-detail/containers';

const ProductInfoPage = React.lazy(() => import('./ProductInfoPage'));
const ProductVariantPage = React.lazy(() => import('./ProductVariantPage'));
const ProductInventoryPage = React.lazy(() => import('./ProductInventoryPage'));
const SkuInventoryPage = React.lazy(() => import('./SkuInventoryPage'));

const productDetailRoutes: IRoute[] = [
  {
    index: true,
    element: <ProductInfoPage />,
  },
  {
    path: 'variants',
    element: <ProductVariantPage />,
  },
  {
    path: 'inventory',
    children: [
      {
        index: true,
        element: <ProductInventoryPage />,
      },
      {
        path: ':sku',
        element: <SkuInventoryPage />,
      },
    ],
  },
];

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const outlet = useRoutes(productDetailRoutes as RouteObject[]);

  return (
    <ProductDetailProvider productId={id as ID}>
      <ProductDetailPageLayout>
        <Suspense>{outlet}</Suspense>
      </ProductDetailPageLayout>
    </ProductDetailProvider>
  );
};

export default ProductDetailPage;
