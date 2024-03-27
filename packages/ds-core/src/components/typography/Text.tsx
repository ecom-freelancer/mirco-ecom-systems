import styled from '@emotion/styled';
import { TypographyProps } from './type';
import {
  getFontSize,
  getFontWeight,
  getThemeColor,
} from '../../utils/getThemeToken';

export interface TextProps extends TypographyProps {}

export const Text = styled.span<TextProps>`
  /* 
    set color
  */
  ${({ color, theme }) => color && `color: ${getThemeColor(color, theme)};`}
  ${({ underline }) => underline && `text-decoration: underline;`}
  ${({ italic }) => italic && `font-style: italic;`}
  ${({ fontSize, theme }) =>
    fontSize && `font-size: ${getFontSize(fontSize, theme)};`}
  ${({ fontWeight, theme }) =>
    fontWeight && `font-weight: ${getFontWeight(fontWeight, theme)};`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight};`}
  ${({ block }) => block && `display: block;`}
  ${({ transform }) => transform && `text-transform: ${transform};`}
  ${({ whiteSpace }) => whiteSpace && `white-space: ${whiteSpace};`}
`;
