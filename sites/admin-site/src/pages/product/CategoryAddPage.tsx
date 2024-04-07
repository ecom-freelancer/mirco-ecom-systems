import { Page } from '../../modules/_shared/components/Page.tsx';
import { t } from 'i18next';
import { routeKeys } from '../../configs/constants';
import UpsertCategoryForm from '../../modules/products/containers/UpsertCategoryForm.tsx';
import React from 'react';
import { useUpsertCategory } from '../../modules/products';

const CategoryAddPage: React.FC = () => {
  const { upsertCategory, loading: upsertLoading } = useUpsertCategory();

  return (
    <Page
      breadcrumbs={[
        {
          label: t('categories'),
          href: routeKeys.category,
        },
        {
          label: t('categoryAdd'),
          href: '#',
        },
      ]}
      title={t('categoryAdd')}
    >
      <UpsertCategoryForm onSubmit={upsertCategory} loading={upsertLoading} />
    </Page>
  );
};

export default CategoryAddPage;
