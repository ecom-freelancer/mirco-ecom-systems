import styled from '@emotion/styled';
import { Space } from '../../theme/token';
import React from 'react';

type AlignFlex =
  | 'center'
  | 'end'
  | 'start'
  | 'baseline'
  | 'inherit'
  | 'initial'
  | 'stretch';
type JustifyFlex =
  | 'center'
  | 'end'
  | 'start'
  | 'space-between'
  | 'space-around'
  | 'inherit'
  | 'initial';
type WrapValues = 'nowrap' | 'wrap' | 'wrap-reverse' | 'initial' | 'inherit';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  align?: AlignFlex;
  justify?: JustifyFlex;
  gapX?: Space;
  gapY?: Space;
  gap?: Space;
  flexWrap?: WrapValues;
  inline?: boolean;
  block?: boolean;
}

const StyledFlex = styled.div<FlexProps>(({ theme, ...props }) => [
  {
    display: 'flex',
    width: props.block ? '100%' : 'auto',
    flexDirection: props.direction,
    gap: theme.spaces[props.gap || 's0'],
    columnGap: theme.spaces[props.gapX || props.gap || 's0'],
    rowGap: theme.spaces[props.gapY || props.gap || 's0'],
    justifyContent: buildVariant(props.justify || ''),
    alignItems: buildVariant(props.align || ''),
    flexWrap: props.flexWrap,
  },
]);

//helper
const buildVariant = (variant: string) => {
  switch (variant) {
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
    default:
      return variant;
  }
};

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => {
    return <StyledFlex {...props} ref={ref} />;
  },
);

Flex.displayName = 'Flex';
