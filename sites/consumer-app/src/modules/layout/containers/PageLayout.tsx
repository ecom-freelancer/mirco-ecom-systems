'use client';

import { Box, Heading, styled } from '@packages/ds-core';
import { BreadCrumbs, IBreadcrumb } from '../components/Breadcrumb';
import { Container } from '../components/Contatiner';

export interface PageLayoutProps {
  title?: string;
  breadcrumbs?: IBreadcrumb[];
  className?: string;
  children?: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  breadcrumbs,
  children,
  title,
  className,
}) => {
  return (
    <Container className={className}>
      <Wrapper>
        {breadcrumbs?.length && <BreadCrumbs breadcrumbs={breadcrumbs} />}
        {title && <Title type="h1">{title}</Title>}
        <Box>{children}</Box>
      </Wrapper>
    </Container>
  );
};

const Wrapper = styled(Box)``;

const Title = styled(Heading)`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  line-height: 32px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;
