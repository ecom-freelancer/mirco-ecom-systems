import { Box, Flex, Text, styled } from '@packages/ds-core';
import React from 'react';
import { useProductContext } from '../hooks/useProductContext';
import { TbCategory } from 'react-icons/tb';
import { Tabs, Tag } from 'antd';
import { useMatch, useNavigate } from 'react-router';
import { routeKeys } from 'configs/constants';
import { IRoute } from 'configs/router';
import { productStatuses } from 'configs/constants/product';

export interface ProductDetailPageLayoutProps {
  children?: React.ReactNode;
}

const routes: IRoute[] = [
  {
    index: true,
    path: '/',
    label: 'Product Overview',
  },
  {
    path: '/variants',
    label: 'Variants & Skus',
  },
  {
    path: '/inventory',
    label: 'Inventory',
  },
];

export const ProductDetailPageLayout: React.FC<
  ProductDetailPageLayoutProps
> = ({ children }) => {
  const { product } = useProductContext();

  const match = useMatch(routeKeys.productDetailGroup);

  const navigate = useNavigate();

  const activeKey =
    [...routes].find(
      (route) =>
        match?.pathname.startsWith(`/products/${product.id}${route.path}`) &&
        route.path != '/',
    )?.path || '/';

  const productStatusOption =
    productStatuses.find((status) => status.value === product.status) ||
    productStatuses[0];

  return (
    <Wrapper>
      <Header>
        <Flex justify="space-between" align="center">
          <Flex align="center" gapX="s12">
            <Icon>
              <TbCategory size={24} />
            </Icon>
            <Box>
              <Box>
                <Text color="textSecondary">Product</Text>
              </Box>
              <Box marginTop="s4">
                <Text fontSize="h5" fontWeight="bold">
                  {product.name}
                </Text>
              </Box>
            </Box>
          </Flex>
          <Box>
            <Tag color={productStatusOption.color}>
              {productStatusOption.label}
            </Tag>
          </Box>
        </Flex>
      </Header>

      <StyledTabs
        activeKey={activeKey}
        onChange={(key) => navigate(`/products/${product.id}${key}`)}
        items={routes.map((route) => ({
          key: route.path || '',
          label: route.label,
        }))}
      />

      <Content>{children}</Content>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled(Box)`
  background-color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spaces.s12};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayA50};
`;

const Icon = styled(Box)`
  background-color: ${({ theme }) => theme.colors.primaryA50};
  display: inline-flex;
  border-radius: 6px;
  padding: ${({ theme }) => theme.spaces.s10};
  align-items: center;
  justify-content: center;
`;

const StyledTabs = styled(Tabs)`
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayA50};
  .ant-tabs-nav {
    margin: 0 !important;
    margin-left: 0.5rem !important;
  }
  .ant-tabs-tab {
    padding: 0.75rem 0.5rem;
  }
`;

const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;
`;
