import { FormBuilder } from '@packages/react-form-builder';
import { FormInstance } from 'antd';
import React, { useMemo } from 'react';
import { Text } from '@packages/ds-core';
import { debounce } from 'lodash';
import {
  FormDescriptionInput,
  FormDescriptionInputProps,
} from './ProductDescription';
import { IProductBaseInfo, IProductCategory } from 'modules/products/types';
import { stringToSlug } from 'modules/_shared/helper';

export interface ProductBaseInfoFormProps {
  form: FormInstance;
  initialValue?: Partial<IProductBaseInfo>;
  allCategories?: IProductCategory[];
  asChild?: boolean;
}

export const ProductBaseInfoForm: React.FC<ProductBaseInfoFormProps> = ({
  form,
  initialValue,
  allCategories,
  asChild,
}) => {
  const generateSlugFun = useMemo(() => {
    return debounce((value: string) => {
      const slug = stringToSlug(value);
      form.setFieldsValue({ slug: slug });
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <FormBuilder<IProductBaseInfo>
        form={form}
        asChild={asChild}
        configs={{
          name: {
            formType: 'input',
            placeholder: 'Enter name of the product',
            label: (
              <Text color="textPrimary" fontWeight="300">
                Title
              </Text>
            ),
            onChange: (e) => {
              form.setFieldValue('name', e.target.value);
              generateSlugFun(e.target.value);
            },
            rules: [
              {
                required: true,
                message: 'Title is required',
              },
            ],
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
                message: 'Slug is required',
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
            name: 'name',
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
          {
            name: 'userManual',
            span: 24,
          },
        ]}
        formLayout="vertical"
        initialValues={initialValue}
      />
    </div>
  );
};
