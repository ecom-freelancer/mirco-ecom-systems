import { IUser } from '@/modules/auth/auth.interface';
import { Box, Text } from '@packages/ds-core';
import { FormBuilder } from '@packages/react-form-builder/dist/FormBuilder';
import { Button, Flex } from 'antd';
import { useForm } from 'antd/es/form/Form';

export interface PersonalInfomationFormProps {
  user: IUser;
}

export type IPersonalFormType = Pick<IUser, 'firstName' | 'lastName' | 'phone'>;

export const PersonalInfomationForm: React.FC<PersonalInfomationFormProps> = ({
  user,
}) => {
  const [form] = useForm();

  const initialValues: IPersonalFormType = {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
  };
  return (
    <div>
      <FormBuilder<IPersonalFormType>
        form={form}
        initialValues={initialValues}
        configs={{
          firstName: {
            formType: 'input',
            label: (
              <Text fontWeight="600" transform="uppercase" fontSize="xs">
                First name
              </Text>
            ),
            rules: [
              {
                required: true,
                message: 'First name is required',
              },
            ],
          },
          lastName: {
            formType: 'input',
            label: (
              <Text fontWeight="500" transform="uppercase" fontSize="xs">
                Last name
              </Text>
            ),
          },
          phone: {
            formType: 'input',
            label: (
              <Text fontWeight="500" transform="uppercase" fontSize="xs">
                Phone number
              </Text>
            ),
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
            name: 'phone',
            span: 12,
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
