import { default as baseStyled } from '@emotion/styled';
import { ThemeToken } from './theme/token';

declare module '@emotion/react' {
  interface Theme extends ThemeToken {}
}

export const styled = baseStyled;
