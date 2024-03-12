import { styled, Text } from '@packages/ds-core';
import React from 'react';

export interface LabelFormInputWrapperProps {
  label: string;
  children: React.ReactNode;
}

export const LabelFormInputWrapper: React.FC<LabelFormInputWrapperProps> = ({
  children,
  label,
}) => {
  return (
    <Wrapper>
      <Text className="label-form-input-label" fontSize="xs">
        {label}
      </Text>
      <div>{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  .label-form-input-label {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0.5rem;
    padding: 0 0.5rem 0 0.35rem;
    background-color: ${({ theme }) => theme.colors.background};
    transition: opacity 0.25s, transform 0.25s;
  }

  :focus-within {
    .label-form-input-label {
      opacity: 1;
      z-index: 2;
      transform: translateY(-50%);
      transform: translateY(-50%);
      color: ${({ theme }) => theme.colors.primary};
    }
    input::placeholder {
      opacity: 0;
    }
  }

  input::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.s};
  }

  :where(.ant-input-status-error:not(.ant-input-disabled)) {
    background-color: ${({ theme }) => theme.colors.error};
  }
`;
