import { Page } from '../../modules/_shared/components/Page.tsx';
import { t } from 'i18next';
import { routeKeys } from '../../configs/constants';
import UpsertCategoryForm from '../../modules/products/containers/UpsertCategoryForm.tsx';
import React from 'react';

const CategoryAddPage: React.FC = () => {
  return (
    <Page
      breadcrumbs={[
        {
          label: t('Category'),
          href: routeKeys.category,
        },
        {
          label: t('categoryAdd'),
          href: '#',
        },
      ]}
      title={t('categoryAdd')}
    >
      <UpsertCategoryForm />
    </Page>
  );
};

export default CategoryAddPage;
