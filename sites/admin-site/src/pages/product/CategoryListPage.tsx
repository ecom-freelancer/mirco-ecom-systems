import { t } from 'i18next';
import { Page } from 'modules/_shared/components/Page';
import { routeKeys } from 'configs/constants';
import {
  CategoryList,
  CategoryReorderList,
} from 'modules/products/components/product-category';
import { useCategories, useUpsertCategory } from 'modules/products/hooks';
import { useNavigate } from 'react-router-dom';
import { Button, Flex } from 'antd';
import React, { useState } from 'react';
import { styled } from '@packages/ds-core';
import { IReorderCategoryPayload } from 'modules/products/types';
import PaypalPayment from '../paypal-payment/PaypalPayment.tsx';

const ActionButtonsWrapper = styled(Flex)`
  margin-bottom: ${({ theme }) => theme.spaces.s16};
`;

enum Mode {
  VIEW_MODE = 'view',
  REORDER_MODE = 'reorder',
}

const CategoryListPage: React.FC = () => {
  const { categories, loading, getCategories } = useCategories();
  const { reorderCategory, loading: reorderLoading } = useUpsertCategory();
  const [mode, setMode] = useState<Mode>(Mode.VIEW_MODE);
  const navigate = useNavigate();

  const handleClickSaveReorder = async (payload: IReorderCategoryPayload) => {
    await reorderCategory(payload);
    await getCategories();
  };

  return (
    <Page
      breadcrumbs={[
        {
          label: t('categories'),
          href: '#',
        },
      ]}
      title={t('categories')}
    >
      <PaypalPayment />
      {mode === Mode.VIEW_MODE && (
        <ActionButtonsWrapper justify="end" gap="small">
          <Button onClick={() => setMode(Mode.REORDER_MODE)}>Reorder</Button>
          <Button
            type="primary"
            onClick={() => navigate(routeKeys.categoryAdd)}
          >
            Add new
          </Button>
        </ActionButtonsWrapper>
      )}

      {mode === Mode.VIEW_MODE ? (
        <CategoryList categories={categories} loading={loading} />
      ) : (
        <CategoryReorderList
          categories={categories}
          loading={reorderLoading}
          onClickCancel={() => setMode(Mode.VIEW_MODE)}
          onClickSave={handleClickSaveReorder}
        />
      )}
    </Page>
  );
};

export default CategoryListPage;
