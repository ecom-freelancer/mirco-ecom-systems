import { t } from 'i18next';
import { Page } from 'modules/_shared/components/Page';
import { routeKeys } from 'configs/constants';
import CategoryList from 'modules/products/components/product-category';

const CategoryListPage = () => {
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
      <CategoryList />
    </Page>
  );
};

export default CategoryListPage;
