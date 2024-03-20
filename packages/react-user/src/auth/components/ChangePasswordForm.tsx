import React from 'react';

import { Box, Heading, Flex, styled } from '@packages/ds-core';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useForm } from 'antd/es/form/Form';
import { PasswordWithRules } from './password-form-input/InputWithRules';

export interface ChangePasswordFormProps {
  onValidateOldPassword?: (value: string) => Promise<boolean>;
  onSubmit?: (values: { password: string; newPassword: string }) => void;
  loading?: boolean;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onValidateOldPassword,
  onSubmit,
  loading,
}) => {
  const [form] = useForm();

  return (
    <Flex direction="column" align="center">
      <Box marginBottom="s16">
        <Flex justify="center" direction="column" align="center">
          <Heading type="h3" color="primary">
            Change password
          </Heading>
        </Flex>
        <Flex justify="center">
          <Line />
        </Flex>
      </Box>

      <Box style={{ minWidth: 300 }}>
        <Form
          layout="vertical"
          autoComplete="false"
          form={form}
          onFinish={onSubmit}
        >
          <StyledFormItem
            label="Old password"
            name="password"
            required={false}
            hasFeedback
            validateFirst
            validateDebounce={1000}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters!',
              },
              {
                validator: async (_, value) => {
                  return new Promise((resolve, reject) => {
                    if (!onValidateOldPassword) {
                      resolve(true);
                    } else {
                      onValidateOldPassword(value)
                        .then((isValid) => {
                          if (isValid) {
                            resolve(true);
                          } else {
                            reject('The old password is incorrect!');
                          }
                        })
                        .catch(reject);
                    }
                  });
                },
              },
            ]}
          >
            <StyledInputPassword />
          </StyledFormItem>

          <StyledFormItem
            label="New password"
            name="newPassword"
            required={false}
            rules={[
              {
                required: true,
                message: 'Please input your new password!',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters!',
              },
            ]}
            help={
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
            }
          >
            <StyledInputPassword />
          </StyledFormItem>

          <StyledFormItem
            label="Confirm new password"
            name="confirmPassword"
            dependencies={['newPassword']}
            required={false}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <StyledInputPassword />
          </StyledFormItem>
          <Box marginTop="s16">
            <Flex justify="center">
              <ConfirmButton
                type="primary"
                size="large"
                loading={loading}
                htmlType="submit"
              >
                Confirm
              </ConfirmButton>
            </Flex>
          </Box>
        </Form>
      </Box>
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

  .ant-form-item-explain-error,
  .ant-form-item-explain-success {
    font-size: ${({ theme }) => theme.fontSizes.xs} !important;
  }

  .ant-form-item-explain-error:empty {
    margin: 0 !important;
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
