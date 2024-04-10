import { Box, Flex, Heading, styled } from '@packages/ds-core';
import React from 'react';

export interface SectionProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  extra: React.ReactNode[];
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  extra,
  className,
}) => {
  return (
    <Wrapper className={className}>
      <Title gapX="s16" justify="space-between">
        <Heading
          type="h5"
          style={{
            marginBottom: 0,
          }}
        >
          {title}
        </Heading>
        <Flex justify="end" gapX="s6">
          {extra}
        </Flex>
      </Title>
      <Box style={{ minHeight: 100 }}>{children}</Box>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: ${({ theme }) => theme.radius.r4};
`;

const Title = styled(Flex)`
  padding: 0.625rem 0;
`;
