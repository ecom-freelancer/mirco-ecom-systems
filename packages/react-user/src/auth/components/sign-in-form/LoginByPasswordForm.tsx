import { Box, Flex, Text, styled } from '@packages/ds-core';
import { Button, Checkbox, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';
import { LabelFormInputWrapper } from '../label-with-form-input/LabelWraper';
import { useForm } from 'antd/es/form/Form';

export interface PasswordLessAuthConfig {
  onSubmit?: (username: string, password: string) => Promise<void>;
  onForgotPassword?: () => void;
}

export interface LoginByPasswordFormProps {
  config: PasswordLessAuthConfig;
}

export const LoginByPasswordForm: React.FC<LoginByPasswordFormProps> = ({
  config: { onSubmit, onForgotPassword },
}) => {
  const [form] = useForm();

  return (
    <Form
      spellCheck={false}
      form={form}
      onFinish={(values) => {
        onSubmit(values.email, values.password);
      }}
    >
      <LabelFormInputWrapper label="Email">
        <StyledFormItem
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please input valid email!',
            },
          ]}
        >
          <Input placeholder="Email" />
        </StyledFormItem>
      </LabelFormInputWrapper>
      <LabelFormInputWrapper label="Password">
        <StyledFormItem name="password">
          <Input.Password placeholder="password" />
        </StyledFormItem>
      </LabelFormInputWrapper>

      <Flex justify="space-between">
        <Checkbox>
          <Text fontWeight="bold" fontSize="s">
            Remember me
          </Text>
        </Checkbox>

        <Text fontWeight="bold" fontSize="s" onClick={onForgotPassword}>
          Forgot password?
        </Text>
      </Flex>
      <Box marginTop="s16">
        <Flex justify="center">
          <LoginButton
            color="primary"
            type="primary"
            htmlType="submit"
            size="large"
          >
            <Text fontWeight="bold">Sign In</Text>
          </LoginButton>
        </Flex>
      </Box>
    </Form>
  );
};

const StyledFormItem = styled(FormItem)`
  margin-bottom: 1rem;

  .ant-form-item-explain-error {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin-bottom: 0.5rem;
    margin-top: 0.25rem;
  }
`;

const LoginButton = styled(Button)`
  border-radius: 999rem;
  padding: 0 2rem;
`;
