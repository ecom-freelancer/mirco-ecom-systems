import React, { ReactNode, useMemo } from 'react';
import { Theme, ThemeProvider as BaseThemeProvider } from '@emotion/react';
import { CustomTheme, defaultTheme } from './token';
import { generateThemeColors, themeColors } from './token/colors';

export interface ThemeProviderProps {
  theme?: CustomTheme;
  children?: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const colors = useMemo(
    () => ({
      ...defaultTheme.colors,
      ...generateThemeColors({ ...themeColors, ...(theme?.colors || {}) }),
    }),
    [theme],
  );

  const emotionTheme: Theme = {
    ...defaultTheme,
    colors,
  };

  return <BaseThemeProvider theme={emotionTheme}>{children}</BaseThemeProvider>;
};
