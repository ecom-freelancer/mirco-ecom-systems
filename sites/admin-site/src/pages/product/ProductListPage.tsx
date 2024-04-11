import { t } from 'i18next';
import { Page } from '../../modules/_shared/components/Page.tsx';
import { useState } from 'react';
import { GetListProductParams } from '../../modules/products/types';
import { useGetListProduct } from '../../modules/products/hooks/useGetListProduct.ts';

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
      <h1>Hello</h1>
    </Page>
  );
};
