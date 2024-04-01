import { Box, Heading } from '@packages/ds-core';
import { FormBuilder } from '@packages/react-form-builder';
import { Flex, FormInstance } from 'antd';
import { IProductAttribute } from '../types';
import { ProductAttributesFormItem } from './AttributesFormItem';

export interface ProductAttributesFormProps {
  form: FormInstance;
}

export const ProductAttributesForm: React.FC<ProductAttributesFormProps> = ({
  form,
}) => {
  return (
    <div>
      <Flex>
        <Heading type="h6">Attributes</Heading>
      </Flex>
      <Box marginBottom="s16" />
      <FormBuilder<{
        attributes: Array<IProductAttribute>;
      }>
        form={form}
        asChild
        formLayout="vertical"
        configs={{
          attributes: {
            formType: 'custom',
            render: (props) => {
              return <ProductAttributesFormItem {...props} />;
            },
            validateFirst: true,
            rules: [
              {
                validator: (_, value?: IProductAttribute[]) => {
                  if (!!value && value?.length > 0) {
                    const isValueValid = value.every((attr) => {
                      return (
                        !!attr.name &&
                        !!attr.options &&
                        attr.options.length > 0 &&
                        attr.options.every((opt) => !!opt.name)
                      );
                    });

                    if (!isValueValid) {
                      return Promise.reject('Please fill all attribute fields');
                    }
                  }
                  return Promise.resolve();
                },
              },
            ],
          },
        }}
        layouts={[
          {
            name: 'attributes',
            span: 24,
          },
        ]}
      />
    </div>
  );
};
