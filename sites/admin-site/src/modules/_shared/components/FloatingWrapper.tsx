import { styled } from '@packages/ds-core';
import React from 'react';

interface FloatingWrapperProps {
  right?: string;
  bottom?: string;
  children: React.ReactNode;
}

const Wrapper = styled.div(
  ({ right, bottom }: { right?: string; bottom?: string }) => `
  position: fixed;
  bottom: ${bottom ? bottom : '-10px'};
  right: ${right ? right : '30px'};
`,
);

// might want to add some more position props soon
const FloatingWrapper: React.FC<FloatingWrapperProps> = ({
  right,
  bottom,
  children,
}) => {
  return (
    <Wrapper right={right} bottom={bottom}>
      {children}
    </Wrapper>
  );
};

export default FloatingWrapper;
