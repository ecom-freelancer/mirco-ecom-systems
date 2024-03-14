import { Color, FontSize, FontWeight } from '../../theme/token';

export interface TypographyProps {
  color?: Color;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  underline?: boolean;
  italic?: boolean;
  lineHeight?: string;
}