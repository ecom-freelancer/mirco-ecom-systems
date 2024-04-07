import { FormBuilder } from '@packages/react-form-builder';
import { FormInstance } from 'antd';
import { SeoInfoForm } from 'modules/seo-info/components';
import { ISeoInfo } from 'modules/seo-info/types';
import React from 'react';

export interface ProductSeoInfoItemProps {
  form: FormInstance;
}
export const ProductSeoInfoItem: React.FC<ProductSeoInfoItemProps> = ({
  form,
}) => {
  return (
    <FormBuilder<{ seoInfo: ISeoInfo }>
      asChild
      configs={{
        seoInfo: {
          formType: 'custom',
          render: (props) => {
            return (
              <SeoInfoForm
                initialValues={props.value}
                onChange={props.onChange}
              />
            );
          },
        },
      }}
      formLayout="vertical"
      layouts={[
        {
          name: 'seoInfo',
          span: 24,
        },
      ]}
      form={form}
    />
  );
};
