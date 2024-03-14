import { Box, Flex, Text, styled } from '@packages/ds-core';
import { Button, Checkbox, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';
import { useForm } from 'antd/es/form/Form';

export interface PasswordLessAuthConfig {
  usernameType?: 'email' | 'text';
  onSubmit?: (username: string, password: string) => Promise<void>;
  onForgotPassword?: () => void;
}

export interface LoginByPasswordFormProps {
  config: PasswordLessAuthConfig;
  loading?: boolean;
}

export const LoginByPasswordForm: React.FC<LoginByPasswordFormProps> = ({
  config: { onSubmit, onForgotPassword, usernameType },
  loading,
}) => {
  const [form] = useForm();

  return (
    <Form
      layout="vertical"
      name="form-sigin-in"
      form={form}
      onFinish={(values) => {
        onSubmit(values.username, values.password);
      }}
    >
      <StyledFormItem
        label="Username"
        name="username"
        required={false}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
          usernameType === 'email'
            ? {
                type: 'email',
                message: 'The input is not valid E-mail!',
              }
            : {},
        ]}
      >
        <StyledInput placeholder="email or username" />
      </StyledFormItem>

      <StyledFormItem name="password" label="Password">
        <StyledInputPassword placeholder="password" />
      </StyledFormItem>

      <Flex justify="space-between">
        <Checkbox name="rememberme">
          <Text fontWeight="bold" fontSize="s">
            Remember me
          </Text>
        </Checkbox>

        <Text
          fontWeight="bold"
          fontSize="s"
          onClick={onForgotPassword}
          color="blue"
        >
          Forgot password?
        </Text>
      </Flex>
      <Box marginTop="s16">
        <Flex justify="center">
          <FormItem>
            <LoginButton
              color="primary"
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              <Text fontWeight="bold">Sign In</Text>
            </LoginButton>
          </FormItem>
        </Flex>
      </Box>
    </Form>
  );
};

const StyledFormItem = styled(FormItem)`
  margin-bottom: 0.75rem !important;

  .ant-form-item-explain {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin-top: 0.5rem;
  }
`;

const LoginButton = styled(Button)`
  border-radius: 999rem;
  padding: 0 2rem;
`;

const StyledInput = styled(Input)`
  background-color: rgb(232, 240, 254) !important;
  border: none;
  padding: 0.45rem 0.45rem;
  :focus-within {
    border: none;
    box-shadow: none;
  }
`;

const StyledInputPassword = styled(Input.Password)`
  background-color: rgb(232, 240, 254) !important;
  border: none;
  padding: 0.45rem 0.45rem;
  :focus-within {
    border: none;
    box-shadow: none;
  }
`;
