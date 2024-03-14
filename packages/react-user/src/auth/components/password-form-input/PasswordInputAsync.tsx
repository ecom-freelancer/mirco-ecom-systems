import { styled } from '@packages/ds-core';
import { Input } from 'antd';
import React from 'react';
import { StatusAsync, StatusAsyncProps } from '../../../components/StatusAsync';
import { PasswordProps } from 'antd/es/input';

export interface PasswordInputAsyncProps extends PasswordProps {
  value?: string;
  statusOptions: Omit<StatusAsyncProps, 'trigger'>;
}

export const PasswordInputAsync: React.FC<PasswordInputAsyncProps> = ({
  statusOptions,
  ...props
}) => {
  const { value } = props;
  return (
    <React.Fragment>
      <StyledInputPassword {...props} />
      <StatusAsync {...statusOptions} trigger={value} />
    </React.Fragment>
  );
};

const StyledInputPassword = styled(Input.Password)`
  background-color: rgb(245, 248, 253) !important;
  border: none;
  padding: 0.45rem 0.45rem;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgb(245, 248, 253) inset !important;
  }

  :focus-within {
    border: none;
    box-shadow: none;
  }

  input:placeholder {
    font-size: ${({ theme }) => theme.fontSizes.s} !important;
  }
`;
