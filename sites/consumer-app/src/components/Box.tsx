import { styled } from '@packages/ds-core';

export const Box = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100px;
  height: 100px;
`;
