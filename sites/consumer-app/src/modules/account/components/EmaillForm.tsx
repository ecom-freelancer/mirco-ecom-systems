import { IUser } from '@/modules/auth/auth.interface';
import { Box, Text } from '@packages/ds-core';
import { FormBuilder } from '@packages/react-form-builder/dist/FormBuilder';
import { Button, Flex } from 'antd';
import { useForm } from 'antd/es/form/Form';

export interface EmailFormProps {
  user: IUser;
}

export type IEmailFormType = {
  form_password?: string;
  form_email?: string;
};

export const EmailForm: React.FC<EmailFormProps> = ({ user }) => {
  const [form] = useForm();

  const initialValues: IEmailFormType = {
    form_email: user.email,
  };

  return (
    <div>
      <FormBuilder<IEmailFormType>
        form={form}
        initialValues={initialValues}
        configs={{
          form_email: {
            formType: 'input',
            label: (
              <Text fontSize="xs" fontWeight="500">
                E-mail Address
              </Text>
            ),
            rules: [
              {
                required: true,
                message: 'Email is required',
              },
              {
                type: 'email',
                message: 'Value is not a valid email',
              },
            ],
          },
          form_password: {
            formType: 'password',
            defaultValue: '',
            label: (
              <Text fontSize="xs" fontWeight="500">
                Password
              </Text>
            ),
            validateFirst: true,
            rules: [
              {
                required: true,
                message: 'Password is required',
              },
              {
                type: 'email',
                message: 'Value is not a valid email',
              },
            ],
          },
        }}
        layouts={[
          {
            name: 'form_email',
            span: 24,
          },
          {
            name: 'form_password',
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
