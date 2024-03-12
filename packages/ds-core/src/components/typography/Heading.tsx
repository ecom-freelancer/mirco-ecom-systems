import React from 'react';
import { TypographyProps } from './type';
import { Text } from './Text';
import styled from '@emotion/styled';
import { FontSize } from '../../theme/token';

export interface HeadingProps
  extends Omit<TypographyProps, 'fontSize' | 'fontWeight'>,
    Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'> {
  type: Extract<FontSize, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
}

export const Heading = React.forwardRef<HTMLElement, HeadingProps>(
  (props, ref) => {
    return <StyledHeading as={props.type} {...props} ref={ref} />;
  },
);

const StyledHeading = styled(Text)<HeadingProps>`
  font-size: ${({ type, theme }) => theme.fontSizes[type]};
  margin-bottom: 0.5rem;
  font-weight: ${({ type, theme }) => theme.fontWeights[600]};
  line-height: 1.2;
  margin-top: 0.25rem;
  display: block;
`;
