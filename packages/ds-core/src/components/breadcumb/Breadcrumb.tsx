import React, { ReactNode } from 'react';
import { Flex } from '../grid';
import { Text } from '../typography';
import styled from '@emotion/styled';
import { Box } from '../Box';

export interface IBreadcrumb {
  label: ReactNode;
  href: string;
  disabled?: boolean;
}

export interface BreadCrumbsProps {
  breadcrumbs: IBreadcrumb[];
  className?: string;
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  breadcrumbs,
  className,
}) => {
  return (
    <Wrapper className={className}>
      <Flex gapX="s4" flexWrap="nowrap" align="baseline">
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <React.Fragment key={index}>
              {index > 0 && <Line />}
              <StyledLink
                href={breadcrumb.href}
                key={index}
                disabled={breadcrumb.disabled}
              >
                <Text whiteSpace="nowrap">{breadcrumb.label}</Text>
              </StyledLink>
            </React.Fragment>
          );
        })}
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  padding: 0.75rem 0;
  overflow-x: auto;
  max-width: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledLink = styled.a<{
  disabled?: boolean;
}>`
  text-decoration: none;
  color: ${({ theme, disabled }) =>
    disabled ? 'currentColor' : theme.colors.secondary};
`;

const Line = styled.div`
  min-width: 1.5px;
  height: 1.1rem;
  background-color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0.5rem;
  rotate: 30deg;
  transform: translateY(3px);
`;
