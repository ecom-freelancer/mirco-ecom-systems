import { t } from 'i18next';
import { Page } from 'modules/_shared/components/Page';
import { routeKeys } from 'configs/constants';
import { CategoryList } from 'modules/products/components/product-category';
import { useCategories } from 'modules/products/hooks';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import React from 'react';

const CategoryListPage: React.FC = () => {
  const { categories, loading } = useCategories();
  const navigate = useNavigate();

  return (
    <Page
      breadcrumbs={[
        {
          label: t('Category'),
          href: '#',
        },
      ]}
      title={t('categories')}
    >
      <Button onClick={() => navigate(routeKeys.categoryAdd)}>Add new</Button>
      <CategoryList categories={categories} loading={loading} />
    </Page>
  );
};

export default CategoryListPage;
