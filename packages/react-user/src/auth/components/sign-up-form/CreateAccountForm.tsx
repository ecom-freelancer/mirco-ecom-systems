import { Box, Flex, Text, styled } from '@packages/ds-core';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'antd/es/form/Form';
import { FormBuilder } from '@packages/react-form-builder';
import { formInputCss } from '../../../styles/form-input';
import Link from 'antd/es/typography/Link';

export interface IRegisterFormType {
  lastName?: string;
  firstName: string;
  password: string;
  confirmPassword: string;
  email: string;
  phonenumber: string;
  agreeTerms?: boolean;
}
export interface CreateAccountFormProps {
  loading?: boolean;
  onSubmit?: (values: IRegisterFormType) => void;
}
export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  loading,
  onSubmit,
}) => {
  const [form] = useForm();

  return (
    <div>
      <FormBuilder<IRegisterFormType>
        formLayout="vertical"
        form={form}
        onSubmit={onSubmit}
        configs={{
          phonenumber: {
            formType: 'input',
            label: 'Phone Number',
            className: formInputCss,
            rules: [
              {
                pattern: /^[0-9]{6,12}$/,
                message: 'Invalid phone number',
              },
            ],
          },
          firstName: {
            formType: 'input',
            className: formInputCss,
            label: 'First Name',
            rules: [
              {
                required: true,
                message: 'This field is required',
              },
            ],
          },
          lastName: {
            formType: 'input',
            className: formInputCss,
            label: 'Last Name',
          },
          password: {
            formType: 'password',
            className: formInputCss,
            label: 'Password',
            rules: [
              {
                required: true,
                message: 'This field is required',
              },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  'Password must contain at least 8 characters, including at least one letter, number and one special character',
              },
            ],
          },
          confirmPassword: {
            formType: 'password',
            className: formInputCss,
            label: 'Cofirm password',
            dependencies: ['password'],
            rules: [
              {
                required: true,
                message: 'This field is required',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match',
                    ),
                  );
                },
              }),
            ],
          },
          email: {
            formType: 'input',
            className: formInputCss,
            label: 'Email',
            validateFirst: true,
            rules: [
              {
                required: true,
                message: 'This field is required',
              },
              {
                type: 'email',
                message: 'Value is not a valid email address',
              },
            ],
          },
          agreeTerms: {
            formType: 'checkbox',
            children: (
              <Text fontSize="xs">
                Create an account means you're okey with our
                <Link>
                  <Text fontSize="xs">&nbsp;Terms of Service</Text>
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
            ),
            rules: [
              {
                required: true,
                message: 'Please agree to the terms and conditions',
              },
            ],
          },
        }}
        layouts={[
          {
            name: 'firstName',
            span: 12,
          },
          {
            name: 'lastName',
            span: 12,
          },
          {
            name: 'email',
            span: 24,
          },
          {
            name: 'password',
            span: 24,
          },
          {
            name: 'confirmPassword',
            span: 24,
          },
          {
            name: 'agreeTerms',
          },
        ]}
      />
      <Box marginTop="s16">
        <Flex justify="center">
          <RegisterButton
            onClick={form.submit}
            type="primary"
            loading={loading}
          >
            <Text>Sign Up</Text>
          </RegisterButton>
        </Flex>
      </Box>
    </div>
  );
};

// const StyledFormItem = styled(FormItem)`
//   margin-bottom: 1rem;
//   .ant-form-item-explain-error {
//     font-size: ${({ theme }) => theme.fontSizes.xs};
//     margin-bottom: 0.5rem;
//     margin-top: 0.25rem;
//   }
// `;

const RegisterButton = styled(Button)`
  border-radius: 999rem;
  padding: 0 2rem;
`;

// const StyledCheckBox = styled(Checkbox)`
//   label {
//     align-items: flex-start;
//   }
// `;
