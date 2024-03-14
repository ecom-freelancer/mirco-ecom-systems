import { Box, Flex, Text, styled } from '@packages/ds-core';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Link from 'antd/es/typography/Link';
import React from 'react';

export const CreateAccountForm = () => {
  return (
    <Form layout="vertical">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <StyledFormItem label={<Label>Full name</Label>}>
            <StyledInput placeholder="Full name" />
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem label="Username">
            <StyledInput placeholder="Full name" />
          </StyledFormItem>
        </Col>
      </Row>

      <StyledFormItem label="Email">
        <StyledInput placeholder="Email" />
      </StyledFormItem>

      <StyledFormItem label="Phone number">
        <StyledInput placeholder="Phonenumber" />
      </StyledFormItem>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <StyledFormItem label="Password">
            <StyledInputPassword placeholder="Password" />
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem label="Confirm password">
            <StyledInputPassword placeholder="Confirm password" />
          </StyledFormItem>
        </Col>
      </Row>

      <Flex gap="s8">
        <StyledFormItem>
          <StyledCheckBox />
        </StyledFormItem>
        <Text fontSize="s">
          Create an account means you're okey with our{' '}
          <Link>Terms of Service</Link> <Link> Privacy Policy</Link> and our
          default <Link>Notification Settings</Link>
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
            <Text fontWeight="bold">Sign up</Text>
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

const StyledCheckBox = styled(Checkbox)`
  label {
    align-items: flex-start;
  }
`;

const Label = styled(Text)`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const StyledInput = styled(Input)`
  background-color: rgb(245, 248, 253) !important;
  border: none;
  padding: 0.45rem 0.45rem;

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgb(245, 248, 253) inset !important;
  }
  :focus-within {
    border: none;
    box-shadow: none;
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
`;
