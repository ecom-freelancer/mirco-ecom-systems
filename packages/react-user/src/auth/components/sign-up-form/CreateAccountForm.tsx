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
          <StyledFormItem label={<Label>Full name</Label>}>
            <Input placeholder="Full name" className={formInputCss} />
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem label="Username">
            <Input placeholder="Username" className={formInputCss} />
          </StyledFormItem>
        </Col>
      </Row>

      <StyledFormItem label="Email">
        <Input placeholder="Email" className={formInputCss} />
      </StyledFormItem>

      <StyledFormItem label="Phone number">
        <Input placeholder="phonenumber" className={formInputCss} />
      </StyledFormItem>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <StyledFormItem label="Password">
            <Input.Password placeholder="Password" className={formInputCss} />
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem label="Confirm password">
            <Input.Password
              placeholder="Confirm password"
              className={formInputCss}
            />
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
