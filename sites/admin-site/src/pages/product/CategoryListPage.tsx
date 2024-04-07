import { t } from 'i18next';
import { Page } from 'modules/_shared/components/Page';
import { routeKeys } from 'configs/constants';
import { CategoryList } from 'modules/products/components/product-category';
import { useCategories } from 'modules/products/hooks';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import React from 'react';

import { styled } from '@packages/ds-core';

const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: end;
  column-gap: ${({ theme }) => theme.spaces.s8};
`;

const CategoryListPage: React.FC = () => {
  const { categories, loading } = useCategories();
  const navigate = useNavigate();

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
      <ActionButtonsWrapper>
        <Button>Reorder</Button>
        <Button type="primary" onClick={() => navigate(routeKeys.categoryAdd)}>
          Add new
        </Button>
      </ActionButtonsWrapper>

      <CategoryList categories={categories} loading={loading} />
    </Page>
  );
};

export default CategoryListPage;
