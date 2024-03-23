import { Text, styled } from '@packages/ds-core';
import React from 'react';

export const AppBanner = () => {
  return (
    <StyledAppBanner>
      <Text fontSize="xs">Free shipping on all orders over $100</Text>
    </StyledAppBanner>
  );
};

const StyledAppBanner = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyA100};
  padding: 0.5rem 2rem;
`;
