import { styled } from '../styled';

export const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors?.primary100 || 'red'};
`;
