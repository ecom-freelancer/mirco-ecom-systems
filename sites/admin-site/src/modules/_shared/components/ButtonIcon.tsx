import { Box, styled } from '@packages/ds-core';
import { Color } from '@packages/ds-core/dist/theme/token';

export const ButtonIcon = styled(Box)<{
  iconColor?: Color;
}>`
  background-color: ${({ theme }) => theme.colors.greyA50};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  aspect-ratio: 1/1;
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme, iconColor }) => theme.colors[iconColor || 'greyA100']};
  display: inline-flex;
  justify-items: center;
  align-items: center;
  :hover {
    background-color: ${({ theme }) => theme.colors.greyA100};
  }
`;
