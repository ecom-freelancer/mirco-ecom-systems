'use client';

import { IProductCategory } from '@/modules/category/types';
import { Flex, styled } from '@packages/ds-core';
import { Logo } from './Logo';
import { CategoryWithFilter } from './CategoryWithFilter';
import { Button } from 'antd';
import { AppNavigatorBar } from './AppNavigator';
import React from 'react';
import { AppBanner } from './AppBanner';
import { useAuthContext } from '@/modules/auth/auth-context';

export interface AppHeaderProps {
  categories: IProductCategory[];
}

export const AppHeader: React.FC<AppHeaderProps> = ({ categories }) => {
  const { openLoginModal } = useAuthContext();
  return (
    <React.Fragment>
      <AppBanner />
      <StyldAppHeader>
        <Flex justify="space-between">
          <MainHeader align="center" gapX="s48">
            <Logo />
            <CategoryWithFilter categories={categories} />
          </MainHeader>
          <AppNavigatorBar />
          <Flex align="center">
            <Button type="primary" onClick={openLoginModal}>
              Login
            </Button>
          </Flex>
        </Flex>
      </StyldAppHeader>
    </React.Fragment>
  );
};

const StyldAppHeader = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyA100};
  padding: 0.25rem 2rem;
`;

const MainHeader = styled(Flex)``;
