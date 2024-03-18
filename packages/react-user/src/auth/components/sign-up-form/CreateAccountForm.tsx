import { Box, Flex, Text, styled } from '@packages/ds-core';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Link from 'antd/es/typography/Link';
import React from 'react';
import { formInputCss } from '../../../styles/form-input';

export const CreateAccountForm = () => {
  return (
    <Form layout="vertical">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <StyledFormItem label="Firt Name">
            <Input
              className={formInputCss}
              placeholder="Enter your first name"
            />
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem label="Last name">
            <Input placeholder="Enter your lastname" className={formInputCss} />
          </StyledFormItem>
        </Col>
      </Row>

      <StyledFormItem label="Email">
        <Input placeholder="Email" className={formInputCss} />
      </StyledFormItem>

      <StyledFormItem label="Contact number">
        <Input placeholder="Ex: 0123456789" className={formInputCss} />
      </StyledFormItem>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <StyledFormItem label="Password">
            <Input.Password className={formInputCss} />
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem label="Confirm password">
            <Input.Password className={formInputCss} />
          </StyledFormItem>
        </Col>
      </Row>

      <Flex gap="s8">
        <StyledFormItem>
          <StyledCheckBox />
        </StyledFormItem>
        <Text fontSize="xs">
          Create an account means you're okey with our
          <Link>
            <Text fontSize="xs">Terms of Service</Text>
          </Link>
          <Link>
            <Link>
              <Text fontSize="xs"> Privacy Policy</Text>
            </Link>
          </Link>
          &nbsp;and our default
          <Link>
            <Link>
              <Text fontSize="xs"> Notification Settings</Text>
            </Link>
          </Link>
        </Text>
      </Flex>

      <Box marginTop="s16">
        <Flex justify="center">
          <LoginButton color="primary" type="primary" htmlType="submit">
            <Text>Sign up</Text>
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
