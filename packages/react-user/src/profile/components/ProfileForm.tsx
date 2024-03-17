import { Flex } from '@packages/ds-core';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { formInputCss } from '../../styles/form-input';
import { StyledFormItem } from '../../styles/form-item';

dayjs.extend(customParseFormat);

export interface IProfile {
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  phonenumber?: string;
  sex?: number;
  city?: string;
  country?: string;
}

export interface ProfileFormProps {
  profile: IProfile;
  onSubmit?: (profile: IProfile) => void;
  loading?: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onSubmit,
  loading,
}) => {
  const [form] = useForm<IProfile>();

  return (
    <Form<IProfile>
      form={form}
      layout="vertical"
      initialValues={{
        ...profile,
        dob: profile.dob ? dayjs(profile.dob) : undefined,
      }}
      onFinish={onSubmit}
    >
      <Row gutter={[16, 0]}>
        <Col span={24} md={12}>
          <StyledFormItem
            required={false}
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className={formInputCss} />
          </StyledFormItem>
        </Col>
        <Col span={24} md={12}>
          <StyledFormItem
            name="lastName"
            label="Last Name"
            required={false}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className={formInputCss} />
          </StyledFormItem>
        </Col>
        <Col span={24}>
          <StyledFormItem
            name="email"
            label="Email"
            required={false}
            rules={[
              {
                required: true,
              },
              {
                type: 'email',
                message: 'Invalid email',
              },
            ]}
          >
            <Input className={formInputCss} />
          </StyledFormItem>
        </Col>

        <Col span={24}>
          <StyledFormItem
            name="phonenumber"
            label="Contact number"
            rules={[
              {
                pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/g,
                message: 'Please enter only number',
              },
            ]}
          >
            <Input className={formInputCss} />
          </StyledFormItem>
        </Col>
        <Col span={24}>
          <StyledFormItem name="dob" label="Birth day">
            <DatePicker
              className={formInputCss}
              placeholder="Select date of birth"
              style={{
                width: '100%',
              }}
            />
          </StyledFormItem>
        </Col>
      </Row>
      <Flex justify="end">
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </Flex>
    </Form>
  );
};
