import styled from '@emotion/styled';
import React from 'react';
import { Flex } from '../../grid';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placholder?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Wrapper className={className}>
        {/* label */}
        <Flex>
          <StyledInput {...props} />
        </Flex>
      </Wrapper>
    );
  },
);

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  flex: 1;
`;

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors?.border};
  padding: ${({ theme }) => theme.spaces.s6} ${({ theme }) => theme.spaces.s4};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.radius.r4};

  /**
   onChild focus 
   */
  &:focus-within {
    border-color: ${({ theme }) => theme.colors?.primary};
  }
`;

Input.displayName = 'Input';
