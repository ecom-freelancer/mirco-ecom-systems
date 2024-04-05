import { FormBuilder } from '@packages/react-form-builder';
import { FormInstance } from 'antd';
import { ProductAttributesFormItem } from './AttributesFormItem';
import { IProductAttribute } from 'modules/products/types';

export interface ProductAttributesFormProps {
  form: FormInstance;
  asChild?: boolean;
}

export const ProductAttributesForm: React.FC<ProductAttributesFormProps> = ({
  form,
  asChild,
}) => {
  return (
    <FormBuilder<{
      attributes: Array<IProductAttribute>;
    }>
      form={form}
      asChild={asChild}
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
  );
};
