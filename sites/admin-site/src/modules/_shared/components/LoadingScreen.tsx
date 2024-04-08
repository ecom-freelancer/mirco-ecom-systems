import { Box, styled } from '@packages/ds-core';
import { Spin } from 'antd';
import React from 'react';

export interface LoadingScreenProps {
  className?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Spin />
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  /* background-color: rgba(255, 255, 255, 0.5); */
`;
