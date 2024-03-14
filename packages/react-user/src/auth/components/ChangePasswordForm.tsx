import React from 'react';

import { Box, Heading, Flex, styled } from '@packages/ds-core';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { PasswordInputAsync } from './password-form-input/PasswordInputAsync';
import { useForm } from 'antd/es/form/Form';
import { PasswordWithRules } from './password-form-input/InputWithRules';

export interface ChangePasswordFormProps {}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({}) => {
  const [form] = useForm();

  return (
    <Flex direction="column" align="center">
      <Box marginBottom="s16">
        <Flex justify="center" direction="column" align="center">
          <Heading type="h2" color="primary">
            Change password
          </Heading>
        </Flex>
        <Flex justify="center">
          <Line />
        </Flex>
      </Box>

      <Box style={{ minWidth: 300 }}>
        <Form layout="vertical" autoComplete="false" form={form}>
          <StyledFormItem
            label="Old password"
            name="password"
            required={false}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <PasswordInputAsync
              statusOptions={{
                messages: {
                  success: 'The password is correct',
                  loading: 'Checking the password...',
                  error: 'The password is incorrect',
                },
                triggerOnNull: false,
                asyncFunc: (password) => {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      if (password === 'password') {
                        resolve('success');
                      } else {
                        resolve('error');
                      }
                    }, 2000);
                  });
                },
              }}
            />
          </StyledFormItem>

          <StyledFormItem label="New password" name="newPassword">
            <PasswordWithRules
              rules={[
                {
                  message:
                    'At least 8 characters long but 16 or more is better.',
                  validate: (value) => value?.length >= 8,
                },
                {
                  validate: (value) => value?.length >= 10,
                  message:
                    'Not contain the username or parts of the full name.',
                },
                {
                  validate: (value) => value?.length >= 20,
                  message:
                    'Contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.',
                },
              ]}
            />
          </StyledFormItem>

          <StyledFormItem label="Confirm new password">
            <StyledInputPassword />
          </StyledFormItem>
        </Form>
      </Box>

      <ConfirmButton type="primary">Confirm</ConfirmButton>
    </Flex>
  );
};

const ConfirmButton = styled(Button)`
  border-radius: ${({ theme }) => theme.radius.round};
  padding: 0 2rem;
`;

const Line = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 0.2rem;
  width: 3.5rem;
`;

const StyledFormItem = styled(FormItem)`
  margin-bottom: 0.25rem !important;

  .ant-form-item-explain-error {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin-bottom: 0.5rem;
    margin-top: 0.25rem;
  }
`;

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
