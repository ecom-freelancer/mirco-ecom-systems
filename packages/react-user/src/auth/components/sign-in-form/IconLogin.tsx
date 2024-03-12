import { styled } from '@packages/ds-core';

export const IconLogin = styled.div`
  font-size: 1.25rem;
  border-radius: ${({ theme }) => theme.radius.round};
  border: 1px solid #ebeaea;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors?.primary};
    border-color: ${({ theme }) => theme.colors?.primary};
  }
`;
