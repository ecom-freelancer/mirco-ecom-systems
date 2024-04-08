import {
  Box,
  BreadCrumbs,
  Heading,
  IBreadcrumb,
  styled,
} from '@packages/ds-core';
import React, { useRef } from 'react';

export interface PageProps {
  breadcrumbs?: IBreadcrumb[];
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  children,
  title,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Wrapper ref={ref} className={className}>
      {breadcrumbs && <StyledBreadcrumbs breadcrumbs={breadcrumbs} />}
      {title && <Heading type="h3">{title}</Heading>}
      {children}
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  padding: 1rem;
  height: 100%;
`;

const StyledBreadcrumbs = styled(BreadCrumbs)`
  padding: 0.5rem 0;
`;
