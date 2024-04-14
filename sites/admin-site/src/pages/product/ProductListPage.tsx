import { t } from 'i18next';
import { Page } from '../../modules/_shared/components/Page.tsx';
import { useState } from 'react';
import { GetListProductParams } from '../../modules/products/types';
import { useGetListProduct } from '../../modules/products/hooks/useGetListProduct.ts';
import { ProductList } from '../../modules/products/components/product-list';
import { useCategories } from '../../modules/products';

const ProductListPage = () => {
  const [params, setParams] = useState<GetListProductParams>({
    page: 1,
    pageSize: 10,
  });

  const { products, loading, totalRecord } = useGetListProduct(params);
  const { categories, loading: loadingCategories } = useCategories();

  const onSearchProducts = async (payload?: Partial<GetListProductParams>) => {
    setParams({ ...params, ...payload });
  };

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
        totalRecord={totalRecord}
        categories={categories}
        onSearchProducts={onSearchProducts}
        pageSize={params.pageSize}
      />
    </Page>
  );
};

export default ProductListPage;
