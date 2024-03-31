import { FormBuilder } from '@packages/react-form-builder';
import { FormInstance } from 'antd';
import React, { useMemo } from 'react';
import { IProductBaseInfo, IProductCategory } from '../types';
import { Text } from '@packages/ds-core';
import { debounce } from 'lodash';
import {
  FormDescriptionInput,
  FormDescriptionInputProps,
} from './ProductDescription';

export interface ProductBaseInfoFormProps {
  form: FormInstance;
  initialValue?: Partial<IProductBaseInfo>;
  allCategories?: IProductCategory[];
}

function stringToSlug(str: string) {
  return str
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-');
}

export const ProductBaseInfoForm: React.FC<ProductBaseInfoFormProps> = ({
  form,
  initialValue,
  allCategories,
}) => {
  const generateSlugFun = useMemo(() => {
    return debounce((value: string) => {
      const slug = stringToSlug(value);
      form.setFieldsValue({ slug: slug });
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <FormBuilder<IProductBaseInfo>
        form={form}
        configs={{
          title: {
            formType: 'input',
            placeholder: 'Enter name of the product',
            label: (
              <Text color="textPrimary" fontWeight="300">
                Title
              </Text>
            ),
            onChange: (e) => {
              generateSlugFun(e.target.value);
            },
          },
          slug: {
            formType: 'input',
            placeholder: 'Enter slug of the product',
            addonBefore: 'products/',
            label: (
              <Text color="textPrimary" fontWeight="300">
                Slug
              </Text>
            ),
            rules: [
              {
                required: true,
                message: 'Slug is rer',
              },
            ],
          },
          description: {
            formType: 'custom',
            render: (props) => (
              <FormDescriptionInput {...(props as FormDescriptionInputProps)} />
            ),
            label: 'Description',
          },
          userManual: {
            formType: 'custom',
            render: (props) => (
              <FormDescriptionInput {...(props as FormDescriptionInputProps)} />
            ),
            label: 'User Manual',
          },
          categoryId: {
            formType: 'select',
            label: 'Category',
            placeholder: 'Select category',
            options: allCategories?.map((category) => ({
              value: category.id,
              label: category.name,
            })),
            rules: [
              {
                required: true,
                message: 'Category is required',
              },
            ],
          },
          brand: {
            formType: 'input',
            label: 'Brand',
            placeholder: 'Enter brand of the product',
          },
        }}
        layouts={[
          {
            name: 'title',
            span: 24,
          },
          {
            name: 'slug',
            span: 24,
          },
          { name: 'categoryId', span: 12 },
          {
            name: 'brand',
            span: 12,
          },
          {
            name: 'description',
            span: 24,
          },
        ]}
        formLayout="vertical"
        initialValues={initialValue}
      />
    </div>
  );
};
