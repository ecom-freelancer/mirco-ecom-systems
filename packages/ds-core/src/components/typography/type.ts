import { Color, FontSize, FontWeight } from '../../theme/token';

export interface TypographyProps {
  color?: Color;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  underline?: boolean;
  italic?: boolean;
  lineHeight?: string;
  block?: boolean;
  transform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none';
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap';
}
