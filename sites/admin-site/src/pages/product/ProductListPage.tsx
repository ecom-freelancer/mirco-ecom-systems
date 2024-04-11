import { t } from 'i18next';
import { Page } from '../../modules/_shared/components/Page.tsx';
import { useState } from 'react';
import { GetListProductParams } from '../../modules/products/types';
import { useGetListProduct } from '../../modules/products/hooks/useGetListProduct.ts';
import { ProductList } from '../../modules/products/components/product-list';
import { useCategories } from '../../modules/products';

export const ProductListPage = () => {
  const [params, setParams] = useState<GetListProductParams>({
    page: 1,
    pageSize: 10,
  });

  const { products, loading, totalPage, totalRecord } =
    useGetListProduct(params);
  const { categories, loading: loadingCategories } = useCategories();

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
        loading={loading || loadingCategories}
        products={products}
        params={params}
        setParams={setParams}
        totalPage={totalPage}
        totalRecord={totalRecord}
        categories={categories}
      />
    </Page>
  );
};
