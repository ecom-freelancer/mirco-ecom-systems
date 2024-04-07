import { FormInstance } from 'antd';
import { ICategoryBaseInfoFormValues } from '../../types';
import React from 'react';
import { FormBuilder } from '@packages/react-form-builder';
import { Text } from '@packages/ds-core';

interface CategoryBaseInfoFormProps {
  form: FormInstance;
  initialValues?: ICategoryBaseInfoFormValues;
}

const CategoryBaseInfoForm: React.FC<CategoryBaseInfoFormProps> = ({
  form,
  initialValues,
}) => {
  return (
    <FormBuilder<ICategoryBaseInfoFormValues>
      form={form}
      asChild
      formLayout="vertical"
      initialValues={initialValues}
      layouts={[
        { name: 'id', span: 0 },
        { name: 'name', span: 24 },
        { name: 'code', span: 24 },
        { name: 'display', span: 24 },
      ]}
      configs={{
        id: {
          formType: 'input-number',
          hidden: true,
        },
        name: {
          formType: 'input',
          placeholder: 'Enter name of the category',
          label: (
            <Text color="textPrimary" fontWeight="300">
              Name
            </Text>
          ),
          onChange: (e) => {
            form.setFieldValue('name', e.target.value);
          },
          rules: [
            {
              required: true,
              message: 'Name is required',
            },
          ],
        },
        code: {
          formType: 'input',
          placeholder: 'Enter category code',
          label: (
            <Text color="textPrimary" fontWeight="300">
              Code
            </Text>
          ),
          onChange: (e) => {
            form.setFieldValue('code', e.target.value);
          },
          rules: [
            {
              required: true,
              message: 'Code is required',
            },
          ],
        },
        display: {
          formType: 'checkbox',
          children: 'Display this category to end user?',
          onChange: (e) => {
            form.setFieldValue('display', e.target.checked);
          },
        },
      }}
    />
  );
};

export default CategoryBaseInfoForm;
