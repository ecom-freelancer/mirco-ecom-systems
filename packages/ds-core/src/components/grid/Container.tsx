import styled from '@emotion/styled';
import { Box } from '../Box';

export const Container = styled(Box)`
  margin: 0 auto;
  max-width: 100%;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  box-sizing: border-box;

  @media screen and (min-width: 375px) {
    width: 100%;
  }

  @media screen and (min-width: 1024px) {
    width: 1024px;
  }

  @media screen and (min-width: 1440px) {
    width: 1124px;
  }
`;
