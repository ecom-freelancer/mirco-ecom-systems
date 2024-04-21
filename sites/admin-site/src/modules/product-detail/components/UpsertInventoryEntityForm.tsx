import { useForm } from 'antd/es/form/Form';
import { Button, Form } from 'antd';
import { ISkuInventoryDto, IUpsertInventoryEntityFormType } from '../types';
import React from 'react';
import { FormBuilder } from '@packages/react-form-builder';
import { inventoryStatuses } from 'configs/constants/inventory.ts';
import { Box, Flex } from '@packages/ds-core';

interface UpsertInventoryEntityFormProps {
  defaultValues: IUpsertInventoryEntityFormType;
  onSubmit: (values: IUpsertInventoryEntityFormType) => void;
  skuInventoryList: ISkuInventoryDto[];
  onCancel: () => void;
  loading: boolean;
}

export const UpsertInventoryEntityForm: React.FC<
  UpsertInventoryEntityFormProps
> = ({ defaultValues, onSubmit, skuInventoryList, onCancel, loading }) => {
  const [form] = useForm();

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={defaultValues}
      >
        <FormBuilder<IUpsertInventoryEntityFormType>
          asChild
          formLayout="vertical"
          layouts={[
            { name: 'id', span: 0 },
            { name: 'barCode', span: 24 },
            { name: 'status', span: 24 },
            { name: 'skuInventoryId', span: 24 },
          ]}
          configs={{
            id: {
              formType: 'input-number',
              hidden: true,
            },
            barCode: {
              formType: 'input',
              label: 'Code',
              placeholder: 'Enter code',
              required: true,
              rules: [
                {
                  required: true,
                  message: 'Code is required',
                },
              ],
            },
            status: {
              formType: 'select',
              label: 'Status',
              required: true,
              options: inventoryStatuses,
              rules: [
                {
                  required: true,
                  message: 'Status is required',
                },
              ],
            },
            skuInventoryId: {
              formType: 'select',
              label: 'Select SKU',
              options: skuInventoryList.map(({ id, productSku }) => ({
                label: `${productSku.name} - SKU: ${productSku.sku}`,
                value: id,
              })),
              required: true,
              rules: [
                {
                  required: true,
                  message: 'SKU is required',
                },
              ],
            },
          }}
        ></FormBuilder>
      </Form>
      <Box marginTop="s16">
        <Flex justify="end" gapX="s8">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Flex>
      </Box>
    </>
  );
};
