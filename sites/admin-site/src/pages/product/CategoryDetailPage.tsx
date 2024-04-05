import { t } from 'i18next';
import { Page } from 'modules/_shared/components/Page';
import { routeKeys } from 'configs/constants';
import UpsertCategoryForm from 'modules/products/containers/UpsertCategoryForm.tsx';
import { useParams } from 'react-router-dom';

const CategoryDetailPage = () => {
  const { id } = useParams();
  // Get id from here, call API get category
  // If no id -> Add
  // If it has id but cannot find category with id -> Not found
  console.log(id);
  return (
    <Page
      breadcrumbs={[
        {
          label: t('Category'),
          href: routeKeys.category,
        },
      ]}
      title={t('categoryDetail')}
    >
      <UpsertCategoryForm />
    </Page>
  );
};

export default CategoryDetailPage;
