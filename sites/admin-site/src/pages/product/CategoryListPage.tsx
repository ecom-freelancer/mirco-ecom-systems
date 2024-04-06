import { t } from 'i18next';
import { Page } from 'modules/_shared/components/Page';
import { routeKeys } from 'configs/constants';
import CategoryList from 'modules/products/components/product-category';
import { useCategories } from 'modules/products/hooks';

const CategoryListPage = () => {
  const { categories, loading } = useCategories();

  return (
    <Page
      breadcrumbs={[
        {
          label: t('Category'),
          href: routeKeys.category,
        },
      ]}
      title={t('categories')}
    >
      <CategoryList categories={categories} loading={loading} />
    </Page>
  );
};

export default CategoryListPage;
