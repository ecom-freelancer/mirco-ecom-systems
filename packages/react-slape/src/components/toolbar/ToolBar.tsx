import { Flex, styled } from '@packages/ds-core';
import React from 'react';
import { TypographyDropdown } from './TypographyDropdown';
import { SlyleItems } from './StyleItems';
import { Alignment } from './Alignment';
import { ImageButton } from './ImageButton';

export interface ToolBarProps {}

export const ToolBar: React.FC<ToolBarProps> = () => {
  return (
    <Wrapper className="slape-toolbar">
      <Flex align="center">
        <TypographyDropdown />
        <Line />
        <SlyleItems />
        <Line />
        <Alignment />
        <Line />
        <ImageButton />
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0.5rem 0.75rem;
  margin-bottom: 2px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Line = styled.div`
  height: 32px;
  width: 1px;
  margin: 0 0.5rem;
  background-color: ${({ theme }) => theme.colors.grayA100};
`;
