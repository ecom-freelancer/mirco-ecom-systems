import { FormInstance } from 'antd';
import { FormBuilder } from '@packages/react-form-builder';
import { ISeoInfo } from 'modules/seo-info/types.ts';
import React from 'react';
import { SeoInfoForm } from 'modules/seo-info/components';

interface CategorySeoInfoFormProps {
  initialValues?: {
    seoInfo: ISeoInfo;
  };
  form: FormInstance;
}

const CategorySeoInfoForm: React.FC<CategorySeoInfoFormProps> = ({
  form,
  initialValues,
}) => {
  return (
    <FormBuilder<{ seoInfo: ISeoInfo }>
      asChild
      initialValues={initialValues}
      formLayout="vertical"
      form={form}
      configs={{
        seoInfo: {
          formType: 'custom',
          render: ({ value, onChange }) => (
            <SeoInfoForm initialValues={value} onChange={onChange} />
          ),
        },
      }}
      layouts={[
        {
          name: 'seoInfo',
          span: 24,
        },
      ]}
    />
  );
};

export default CategorySeoInfoForm;
