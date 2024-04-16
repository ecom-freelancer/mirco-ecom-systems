import { FormBuilder } from '@packages/react-form-builder';
import { useProductContext } from '../hooks/useProductContext';
import { IVariant, IVariantOption } from '../types/variant';
import { Box, Flex } from '@packages/ds-core';
import { Button, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';

export interface VariantFormProps {
  onCancel: () => void;
  onSaved: (variant: IVariant) => void;
  loading?: boolean;
  defaultValues?: IVariant;
}

export const VariantForm: React.FC<VariantFormProps> = ({
  onCancel,
  onSaved,
  loading,
  defaultValues,
}) => {
  const { product } = useProductContext();
  const [form] = useForm();

  const defaultValue: IVariant = {
    id: defaultValues?.id,
    sku: defaultValues?.sku,
    items: product?.attributes?.map(
      (attribute) =>
        ({
          attributeId: attribute.id,
          attributeOptionId: defaultValues?.items?.find(
            (item) => item.attributeId === attribute.id,
          )?.attributeOptionId,
        } as IVariantOption),
    ),
  };

  console.log('defaultValue', defaultValue);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSaved}
        initialValues={defaultValue}
      >
        <FormBuilder<IVariant>
          asChild
          configs={{
            id: {
              formType: 'input-number',
              hidden: true,
            },
            items: {
              formType: 'custom',
              validateFirst: true,
              render: (props) => {
                const { onChange, value = [] } = props;
                return (
                  <Flex direction="column" gap="s16">
                    {product?.attributes?.map((attribute) => {
                      return (
                        <FormBuilder<IVariantOption>
                          onValuesChange={(changedValues) => {
                            const newItems = value.map((item) => {
                              if (item.attributeId === attribute.id) {
                                return {
                                  ...item,
                                  ...changedValues,
                                };
                              }
                              return item;
                            });
                            onChange?.(newItems);
                          }}
                          formLayout="vertical"
                          key={attribute.id}
                          configs={{
                            attributeId: {
                              formType: 'input-number',
                              defaultValue: attribute.id,
                            },
                            attributeOptionId: {
                              formType: 'select',
                              label: attribute.name,
                              defaultValue: value.find(
                                (item) => item.attributeId === attribute.id,
                              )?.attributeOptionId,
                              options: attribute.options?.map((option) => ({
                                label: option.name,
                                value: option.id,
                              })),
                              rules: [
                                {
                                  required: true,
                                  message: 'Please select an option',
                                },
                              ],
                            },
                          }}
                          layouts={[
                            {
                              name: 'attributeId',
                              span: 0,
                            },
                            {
                              name: 'attributeOptionId',
                              span: 24,
                            },
                          ]}
                        />
                      );
                    })}
                  </Flex>
                );
              },
              rules: [
                {
                  validator: async (_, value: IVariantOption[]) => {
                    if (
                      value.length !== product?.attributes?.length ||
                      value.some((item) => !item?.attributeOptionId)
                    ) {
                      return Promise.reject(
                        'Please select an option for each attribute',
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ],
            },
          }}
          layouts={[
            {
              name: 'items',
              span: 24,
            },
            {
              name: 'id',
              span: 0,
            },
          ]}
          formLayout="vertical"
        />
        <Box marginTop="s16">
          <Flex justify="end" gapX="s16">
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </Flex>
        </Box>
      </Form>
    </div>
  );
};

export default VariantForm;
