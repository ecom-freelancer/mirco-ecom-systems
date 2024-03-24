'use client';

import { Box, Heading, styled } from '@packages/ds-core';

export interface SectionProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <section className={className}>
      <Box>
        <Title type="h6">{title}</Title>
        <Dividier />
      </Box>
      <Content padding={['s4', 0]}>{children}</Content>
    </section>
  );
};

const Title = styled(Heading)`
  font-weight: 500;
  line-height: 16px;
`;

const Dividier = styled(Box)`
  padding: 0.25rem 0;

  position: relative;

  ::after {
    position: absolute;
    content: '';
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    transform: translateY(-50%);
  }
`;

const Content = styled(Box)`
  min-height: 100px;
`;
