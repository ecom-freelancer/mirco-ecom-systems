import { Theme } from '@emotion/react';
import { Space } from '../theme/token';

export const getThemeColor = (color: string, theme: Theme) => {
  return theme.colors?.[color] || color;
};

export const getFontWeight = (fontWeight: string, theme: Theme) => {
  return theme.fontWeights?.[fontWeight] || fontWeight;
};

export const getFontSize = (fontSize: string, theme: Theme) => {
  return theme.fontSizes?.[fontSize] || fontSize;
};

export const getSpace = (space: Space, theme: Theme) => {
  return theme.spaces?.[space] || space;
};
