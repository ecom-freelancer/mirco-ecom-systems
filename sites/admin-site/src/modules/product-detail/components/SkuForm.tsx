import { FormBuilder } from '@packages/react-form-builder';
import React from 'react';
import { IUpsertSkuFormType } from '../types.ts/product-skus';
import { UploadImages } from 'modules/_shared/components';
import { useServices } from 'modules/_shared/hooks';
import { Box, Flex } from '@packages/ds-core';
import { Button, Form, Tag, Tooltip } from 'antd';
import { IVariant } from '../types.ts/variant';
import { useForm } from 'antd/es/form/Form';
import { RiAiGenerate } from 'react-icons/ri';
import { generateSku } from '../helpers/sku-helper';
import { stringToSlug } from 'modules/_shared/helper';

export interface SkuFormProps {
  variants?: IVariant[];
  defaultValues?: IUpsertSkuFormType;
  skuDisabled?: boolean;
  loading?: boolean;
  onSubmit?: (values: IUpsertSkuFormType) => void;
}

export const SkuForm: React.FC<SkuFormProps> = ({
  variants = [],
  defaultValues,
  skuDisabled,
  loading,
  onSubmit,
}) => {
  const { fileService } = useServices();
  const [form] = useForm();
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        colon={false}
        onFinish={onSubmit}
        initialValues={defaultValues}
      >
        <FormBuilder<IUpsertSkuFormType>
          asChild
          configs={{
            name: {
              formType: 'input',
              label: 'Name',
              placeholder: 'Enter name',
              required: false,
              validateFirst: true,
              onChange: (e) => {
                form.setFieldsValue({
                  slug: stringToSlug(e.target.value),
                  name: e.target.value,
                });
              },
              rules: [
                {
                  required: true,
                  message: 'Name is required',
                },
                {
                  max: 255,
                  message: 'Name must be less than 255 characters',
                },
              ],
            },
            slug: {
              formType: 'input',
              label: 'Slug',
              placeholder: 'Enter slug',
              addonBefore: 'product/',
              hasFeedback: true,
              required: false,
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: 'Slug is required',
                },
              ],
            },
            sku: {
              formType: 'input',
              label: 'SKU',
              placeholder: 'Enter SKU',
              disabled: skuDisabled,
              addonAfter: (
                <Tooltip title="Generate">
                  <RiAiGenerate
                    onClick={() => {
                      !skuDisabled &&
                        form.setFieldsValue({
                          sku: generateSku(),
                        });
                    }}
                  />
                </Tooltip>
              ),
              required: false,
              rules: [
                {
                  required: true,
                  message: 'Slug is required',
                },
                {
                  max: 255,
                  message: 'SKU must be less than 255 characters',
                },
                {
                  pattern: /^[a-zA-Z0-9-]*$/,
                  message: 'SKU must be alphanumeric',
                },
              ],
            },
            sellable: {
              formType: 'checkbox',
              children: 'Is this product sellable?',
            },
            sellPrice: {
              formType: 'input-number',
              label: 'Sell Price ($)',
              placeholder: 'Enter sell price',
              rules: [
                {
                  required: true,
                  message: 'Sell Price is required',
                },
                {
                  validator: (_, value) => {
                    if (value < 0) {
                      return Promise.reject(
                        'Sell Price must be greater than 0',
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ],
            },
            listPrice: {
              formType: 'input-number',
              label: 'List Price ($)',
              placeholder: 'Enter list price',
              required: false,
              rules: [
                {
                  validator: (_, value) => {
                    if (value < 0) {
                      return Promise.reject(
                        'Sell Price must be greater than 0',
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ],
            },
            images: {
              formType: 'custom',
              label: 'Images',
              render: (props) => (
                <UploadImages
                  {...(props as every)}
                  onUpload={fileService.upload}
                  span={6}
                />
              ),
            },
            variantId: {
              formType: 'select',
              allowClear: true,
              options: [
                ...variants.map((variant) => ({
                  value: variant.id,
                  disabled: !!variant.sku && variant.sku != defaultValues?.sku,
                  label: (
                    <Flex align="center">
                      {variant.items?.map((item) => (
                        <Tag key={item.id} color="gold">
                          {item.attributeOption?.name}
                        </Tag>
                      ))}
                    </Flex>
                  ),
                })),
              ],
              label: 'Variant',
            },
          }}
          layouts={[
            { name: 'name', span: 24 },
            { name: 'sku', span: 24 },
            {
              name: 'slug',
              span: 24,
            },
            {
              name: 'variantId',
              span: 24,
            },
            {
              name: 'sellable',
              span: 24,
            },
            {
              name: 'sellPrice',
              span: 12,
            },
            {
              name: 'listPrice',
              span: 12,
            },
            {
              name: 'images',
              span: 24,
            },
          ]}
          formLayout="vertical"
        />
        <Box marginTop="s16">
          <Flex justify="end" gapX="s8">
            <Button>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </Flex>
        </Box>
      </Form>
    </div>
  );
};
