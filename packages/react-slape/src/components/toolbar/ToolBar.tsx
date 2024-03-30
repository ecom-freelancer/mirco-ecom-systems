import { Flex, styled } from '@packages/ds-core';
import React from 'react';
import { TypographyDropdown } from './TypographyDropdown';
import { SlyleItems } from './StyleItems';
import { Alignment } from './Alignment';
import { ImageButton } from './ImageButton';
import { LinkButton } from './LinkButton';

export interface ToolBarProps {}

export const ToolBar: React.FC<ToolBarProps> = () => {
  return (
    <Wrapper className="slape-toolbar">
      <Flex align="center" gapX="s8">
        <TypographyDropdown />
        <Line />
        <SlyleItems />
        <Line />
        <Alignment />
        <Line />
        <ImageButton />
        <LinkButton />
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
  height: 24px;
  width: 1px;
  margin: 0 0.5rem;
  background-color: ${({ theme }) => theme.colors.grayA100};
`;
