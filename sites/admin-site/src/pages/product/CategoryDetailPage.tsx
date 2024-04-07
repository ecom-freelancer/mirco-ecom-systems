import { t } from 'i18next';
import { Page } from 'modules/_shared/components/Page';
import { routeKeys } from 'configs/constants';
import UpsertCategoryForm from 'modules/products/containers/UpsertCategoryForm';
import { useParams } from 'react-router-dom';
import { useCategoryDetail, useUpsertCategory } from 'modules/products/hooks';
import React from 'react';

const CategoryDetailPage: React.FC = () => {
  const { id } = useParams();
  const { category, isLoading: detailLoading } = useCategoryDetail(id);
  const { upsertCategory, loading: upsertLoading } = useUpsertCategory();

  if (detailLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Page
      breadcrumbs={[
        {
          label: t('Category'),
          href: routeKeys.category,
        },
        {
          label: t('categories'),
          href: '#',
        },
      ]}
      title={t('categoryDetail')}
    >
      {category ? (
        <UpsertCategoryForm
          category={category}
          onSubmit={upsertCategory}
          loading={upsertLoading}
        />
      ) : (
        <h1>Not found</h1>
      )}
    </Page>
  );
};

export default CategoryDetailPage;
