export const theme = {
  colors: {
    activeMenu: '#eb1f3a',
    activeMenuBackground: '#272d36',
    sideBar: '#1c222b',
    divider: '#f6f1f1',

    textPrimary: '#000000e0',
    textSecondary: '#8f9598',

    success: '#4caf50',
    warning: '#ffc107',
    error: '#ffb300',
  },
  spacing: {
    0: 0,
    s2: '0.125rem',
    s4: '0.25rem',
    s6: '0.375rem',
    s8: '0.5rem',
    s12: '0.75rem',
    s16: '1rem',
    s24: '1.5rem',
    s32: '2rem',
    s48: '3rem',
  },
  radi: {
    0: 0,
    r2: '0.125rem',
    r4: '0.25rem',
    r6: '0.375rem',
    r8: '0.5rem',
    r12: '0.75rem',
    r16: '1rem',
    r24: '1.5rem',
    r32: '2rem',
    r48: '3rem',
    circle: '50%',
  },
};

export type Spacing = keyof typeof theme.spacing;
export type ThemeType = typeof theme;
export type ThemeColor = keyof ThemeType['colors'];

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends ThemeType {}
}
