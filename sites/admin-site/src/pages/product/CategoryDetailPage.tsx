import { t } from 'i18next';
import { Page } from 'modules/_shared/components/Page';
import { routeKeys } from 'configs/constants';
import UpsertCategoryForm from 'modules/products/containers/UpsertCategoryForm';
import { useParams } from 'react-router-dom';
import { useCategoryDetail } from 'modules/products/hooks/useCategoryDetail';

const CategoryDetailPage = () => {
  const { id } = useParams();
  // Get id from here, call API get category
  // If no id -> Add
  // If it has id but cannot find category with id -> Not found
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
          href: '',
        },
      ]}
      title={t('categoryDetail')}
    >
      {category ? (
        <UpsertCategoryForm initialValue={category} />
      ) : (
        <h1>Not found</h1>
      )}
    </Page>
  );
};

export default CategoryDetailPage;
