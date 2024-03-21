'use client';

import { Box, styled } from '@packages/ds-core';

export const Container = styled(Box)`
  max-width: 90%;
  margin: auto;

  @media screen and (min-width: 768px) {
    max-width: 768px;
  }

  @media screen and (min-width: 1024px) {
    max-width: 1024px;
  }
`;
