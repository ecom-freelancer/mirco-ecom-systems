import React from 'react';
import { FormInstance } from 'antd';
import { ICategoryBaseInfo } from '../../types';
import { useServices } from 'modules/_shared/hooks';
import { FormBuilder } from '@packages/react-form-builder';
import { UploadImageFormItem } from 'modules/_shared/components';

type CategoryImagesFormValues = Pick<ICategoryBaseInfo, 'image'>;

interface CategoryImagesFromProps {
  initialValues?: CategoryImagesFormValues;
  form?: FormInstance;
}

const CategoryImagesForm: React.FC<CategoryImagesFromProps> = ({
  initialValues,
  form,
}) => {
  const { fileService } = useServices();

  return (
    <FormBuilder<CategoryImagesFormValues>
      initialValues={initialValues}
      asChild
      form={form}
      formLayout="vertical"
      layouts={[{ name: 'image', span: 9 }]}
      configs={{
        image: {
          formType: 'custom',
          render: (props) => (
            <UploadImageFormItem
              {...(props as every)}
              onUpload={fileService.upload}
            />
          ),
        },
      }}
    />
  );
};

export default CategoryImagesForm;
