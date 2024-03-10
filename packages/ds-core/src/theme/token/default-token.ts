import {
  ThemeColor,
  generateThemeColors,
  mainColors,
  shadeMainColors,
  themeColors,
} from './colors';

export const fontSizes = {
  x: '0.75rem',
  s: '0.875rem',
  m: '1rem',
  l: '1.125rem',

  h1: '1rem',
  h2: '1rem',
  h3: '1rem',
  h4: '1rem',
  h5: '1rem',
};

export type FontSize = keyof typeof fontSizes;

export const radii = {
  0: 0,
  r2: '0.125rem',
  r4: '0.25rem',
  r8: '0.5rem',
  r16: '1rem',
  r32: '1rem',
  round: '10000rem',
};

export type Radii = keyof typeof radii;

export const spaces = {
  0: 0,
  s2: '0.125rem',
  s4: '0.25rem',
  s6: '0.375rem',
  s8: '0.5rem',
  s10: '0.625rem',
  s12: '0.75rem',
  s16: '1rem',
  s20: '1.25rem',
  s24: '1.5rem',
  s28: '1.75rem',
  s32: '2rem',
  s48: '3rem',
  s64: '4rem',
  s80: '5rem',
};

export type Space = keyof typeof spaces;
export type Spaces = typeof spaces;

export const defaultTheme = {
  colors: {
    ...shadeMainColors(mainColors),
    ...generateThemeColors(themeColors),
  },
  fontSizes: { ...fontSizes },
  spaces: { ...spaces },
  breakpoints: {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1440px)',
    xxl: '(min-width: 1600px)',
  },
  radius: { ...radii },
};

export type ThemeToken = typeof defaultTheme;

export type CustomTheme = {
  colors?: ThemeColor;
};
