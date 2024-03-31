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
        formLayout="vertical"
        configs={{
          attributes: {
            formType: 'custom',
            render: (props) => {
              return <ProductAttributesFormItem {...props} />;
            },
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
