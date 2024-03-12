import styled from '@emotion/styled';
import { Space } from '../theme/token';

export interface BoxProps {
  marginTop?: Space | 'auto';
  marginBottom?: Space | 'auto';
  marginLeft?: Space | 'auto';
  marginRight?: Space | 'auto';
  margin?: Space | 'auto';

  paddingTop?: Space | 'auto';
  paddingBottom?: Space | 'auto';
  paddingLeft?: Space | 'auto';
  paddingRight?: Space | 'auto';
  padding?: Space | 'auto' | Array<Space | 'auto'>;

  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex';
  block?: boolean;
}

export const Box = styled.div<BoxProps>`
  margin: ${({ margin, theme }) => theme.spaces[margin || margin || 's0']};

  margin-top: ${({ marginTop, theme, margin }) =>
    theme.spaces[marginTop || margin || 's0']};

  margin-bottom: ${({ marginBottom, theme, margin }) =>
    theme.spaces[marginBottom || margin || 's0']};

  margin-right: ${({ marginRight, theme, margin }) =>
    theme.spaces[marginRight || margin || 's0']};

  margin-left: ${({ marginLeft, theme, margin }) =>
    theme.spaces[marginLeft || margin || 's0']};

  padding-top: ${({ paddingTop, theme, padding }) =>
    theme.spaces[
      paddingTop || (!Array.isArray(padding) ? padding : undefined) || 's0'
    ]};

  padding-bottom: ${({ paddingBottom, theme, padding }) =>
    theme.spaces[
      paddingBottom || (!Array.isArray(padding) ? padding : undefined) || 's0'
    ]};

  padding-right: ${({ paddingRight, theme, padding }) =>
    theme.spaces[
      paddingRight || (!Array.isArray(padding) ? padding : undefined) || 's0'
    ]};

  padding-left: ${({ paddingLeft, theme, padding }) =>
    theme.spaces[
      paddingLeft || (!Array.isArray(padding) ? padding : undefined) || 's0'
    ]};

  padding: ${({ padding, theme }) =>
    Array.isArray(padding)
      ? [...padding].map((p) => theme.spaces[p || 's0']).join(' ')
      : theme.spaces[(padding as string) || 's0']};

  display: ${({ display }) => display || 'block'};

  width: ${({ block }) => (block ? '100%' : 'auto')};
`;
