import { IProductAttribute } from '../types';
import { useForm } from 'antd/es/form/Form';
import { FormBuilder } from '@packages/react-form-builder';
import React from 'react';
import { Button, Flex } from 'antd';
import { Box } from '@packages/ds-core';

export interface AttributeUpsertFormProps {
  attribute?: IProductAttribute;
}

export const AttributeUpsertForm: React.FC<AttributeUpsertFormProps> = () => {
  const [form] = useForm();
  return (
    <Box marginBottom="s16">
      <FormBuilder<IProductAttribute>
        form={form}
        configs={{
          name: {
            formType: 'input',
            label: 'Attribute',
            placeholder: 'Enter name of the attribute',
          },
          options: {
            formType: 'custom',
            label: 'Options',
            render: () => {
              return <React.Fragment />;
            },
          },
        }}
        layouts={[
          {
            name: 'name',
            span: 12,
          },
          {
            name: 'options',
            span: 12,
          },
        ]}
        formLayout="vertical"
      />
      <Box marginTop="s16">
        <Flex justify="end">
          <Button type="primary">Save</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default AttributeUpsertForm;
