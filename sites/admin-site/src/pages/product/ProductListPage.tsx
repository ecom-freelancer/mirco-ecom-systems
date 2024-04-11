import { t } from 'i18next';
import { Page } from '../../modules/_shared/components/Page.tsx';
import { useState } from 'react';
import { GetListProductParams } from '../../modules/products/types';
import { useGetListProduct } from '../../modules/products/hooks/useGetListProduct.ts';
import { ProductList } from '../../modules/products/components/product-list';

export const ProductListPage = () => {
  const [params, setParams] = useState<GetListProductParams>({
    page: 1,
    pageSize: 10,
  });

  const { products, loading, totalPage, totalRecord } =
    useGetListProduct(params);

  return (
    <Page
      breadcrumbs={[
        {
          label: t('productList'),
          href: '#',
        },
      ]}
      title={t('productList')}
    >
      <ProductList
        loading={loading}
        products={products}
        params={params}
        setParams={setParams}
        totalPage={totalPage}
        totalRecord={totalRecord}
      />
    </Page>
  );
};
