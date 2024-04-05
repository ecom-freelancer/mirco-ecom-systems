import { Box, Flex, Heading, styled } from '@packages/ds-core';
import React from 'react';

export interface FormSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <Wrapper marginBottom="s16" className={className}>
      {title && (
        <React.Fragment>
          <Flex>
            <Heading type="h6">{title}</Heading>
          </Flex>
          <Box marginBottom="s4" />
        </React.Fragment>
      )}
      <Box>{children}</Box>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 1.25rem;
  border-radius: 0.5rem;
`;
