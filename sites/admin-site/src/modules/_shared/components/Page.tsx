import {
  Box,
  BreadCrumbs,
  Heading,
  IBreadcrumb,
  styled,
} from '@packages/ds-core';
import { BackTop } from 'antd';
import React, { useRef } from 'react';

export interface PageProps {
  breadcrumbs?: IBreadcrumb[];
  title?: React.ReactNode;
  children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ breadcrumbs, children, title }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Wrapper ref={ref}>
      {breadcrumbs && <StyledBreadcrumbs breadcrumbs={breadcrumbs} />}
      {title && <Heading type="h3">{title}</Heading>}
      {children}
      <BackTop target={ref.current as never} />
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  padding: 1rem;
`;

const StyledBreadcrumbs = styled(BreadCrumbs)`
  padding: 0.5rem 0;
`;
