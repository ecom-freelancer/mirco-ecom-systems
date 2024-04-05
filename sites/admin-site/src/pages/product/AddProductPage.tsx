import { dynamicRouteKeys, routeKeys } from 'configs/constants';
import { t } from 'i18next';
import { Page } from 'modules/_shared/components/Page';
import { ProductInfoForm, useProductAction } from 'modules/products';
import { IProductInfoFormType } from 'modules/products/types';
import { useNavigate } from 'react-router';

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading } = useProductAction();

  const onCreateProduct = async (product: IProductInfoFormType) => {
    createProduct(product, (id) => {
      navigate(dynamicRouteKeys.productDetail(id));
    });
  };
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
      <ProductInfoForm onSubmit={onCreateProduct} loading={loading} />
    </Page>
  );
};

export default AddProductPage;
