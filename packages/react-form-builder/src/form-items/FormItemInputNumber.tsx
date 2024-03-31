import { styled } from '@packages/ds-core';
import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';

export interface StyledNumberInputProps {
  align?: 'center' | 'left' | 'right';
}

export type NumberInputProps = StyledNumberInputProps &
  InputNumberProps<number | string>;

export const NumberInput: React.FC<NumberInputProps> = ({
  className,
  align,
  ...props
}) => {
  return (
    <StyledInput
      {...props}
      className={className}
      align={align}
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value!.replace(/(,*)/g, '')}
    />
  );
};

const StyledInput = styled(InputNumber)<StyledNumberInputProps>`
  width: 100%;
  input {
    text-align: ${({ align }) => align} !important;
  }
`;

StyledInput.defaultProps = {
  align: 'left',
};
