import { routeKeys } from 'configs/constants';
import { t } from 'i18next';
import { Page } from 'modules/_shared/components/Page';
import { CreateProductForm } from 'modules/products';

const AddProductPage = () => {
  return (
    <Page
      breadcrumbs={[
        {
          label: t('productList'),
          href: routeKeys.products,
        },
        {
          label: t('addProduct'),
          href: '',
        },
      ]}
      title={t('addProduct')}
    >
      <CreateProductForm />
    </Page>
  );
};

export default AddProductPage;
