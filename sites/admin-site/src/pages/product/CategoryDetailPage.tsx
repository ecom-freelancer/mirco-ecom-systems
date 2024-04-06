import { t } from 'i18next';
import { Page } from 'modules/_shared/components/Page';
import { routeKeys } from 'configs/constants';
import UpsertCategoryForm from 'modules/products/containers/UpsertCategoryForm';
import { useParams } from 'react-router-dom';
import { useCategoryDetail } from 'modules/products/hooks/useCategoryDetail';
import React from 'react';

const CategoryDetailPage: React.FC = () => {
  const { id } = useParams();
  const { category, isLoading } = useCategoryDetail(id);

  if (isLoading) {
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
          label: t('categoryDetail'),
          href: '#',
        },
      ]}
      title={t('categoryDetail')}
    >
      {category ? (
        <UpsertCategoryForm category={category} />
      ) : (
        <h1>Not found</h1>
      )}
    </Page>
  );
};

export default CategoryDetailPage;
