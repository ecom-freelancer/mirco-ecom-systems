import {
  Box,
  BreadCrumbs,
  Heading,
  IBreadcrumb,
  styled,
} from '@packages/ds-core';
import { Flex } from 'antd';
import React, { useRef } from 'react';

export interface PageProps {
  breadcrumbs?: IBreadcrumb[];
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  extra?: React.ReactNode[];
}

export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  children,
  title,
  className,
  extra,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Wrapper ref={ref} className={className}>
      {breadcrumbs && <StyledBreadcrumbs breadcrumbs={breadcrumbs} />}
      <Flex align="center" justify="space-between">
        <Box>{title && <Heading type="h3">{title}</Heading>}</Box>
        <Flex gap={'s8'}>{extra}</Flex>
      </Flex>
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
