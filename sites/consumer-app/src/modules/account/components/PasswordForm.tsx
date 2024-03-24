import { IUser } from '@/modules/auth/auth.interface';
import { Box } from '@packages/ds-core';
import { FormBuilder } from '@packages/react-form-builder/dist/FormBuilder';
import { Button, Flex } from 'antd';
import { useForm } from 'antd/es/form/Form';

export interface PasswordFormProps {
  user: IUser;
}

export type IPasswordFormType = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export const PasswordForm: React.FC<PasswordFormProps> = ({ user }) => {
  const [form] = useForm();

  return (
    <div>
      <FormBuilder<IPasswordFormType>
        form={form}
        validateTrigger="onSubmit"
        configs={{
          oldPassword: {
            label: 'Current Password',
            formType: 'password',
            validateFirst: true,
            placeholder: 'Enter your current password',
            rules: [
              {
                required: true,
                message: 'Please input your current password!',
              },
            ],
          },
          newPassword: {
            label: 'New Password',
            formType: 'password',
            validateFirst: true,
            placeholder: 'Enter your new password',
            rules: [
              {
                required: true,
                message: 'Please input your new password!',
              },
            ],
          },
          confirmPassword: {
            label: 'Confirm Password',
            formType: 'password',
            dependencies: ['newPassword'],
            validateFirst: true,
            placeholder: 'Confirm your new password',
            rules: [
              {
                required: true,
                message: 'Please input your new password!',
              },
              {
                validator: async (_, value) => {
                  if (value && value !== form.getFieldValue('newPassword')) {
                    return Promise.reject(
                      'The two passwords that you entered do not match!',
                    );
                  }
                },
              },
            ],
          },
        }}
        layouts={[
          {
            name: 'oldPassword',
            span: 24,
          },
          {
            name: 'newPassword',
            span: 24,
          },
          {
            name: 'confirmPassword',
            span: 24,
          },
        ]}
        formLayout="vertical"
      />

      <Box marginTop="s8">
        <Flex justify="start">
          <Button type="primary" onClick={form.submit}>
            Save
          </Button>
        </Flex>
      </Box>
    </div>
  );
};
