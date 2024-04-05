import { FormInstance } from 'antd';
import { ISeoInfo } from '../types';
import { FormBuilder } from '@packages/react-form-builder';
import {
  KeywordsFormInput,
  KeywordsFormInputProps,
  UploadImageFormItem,
} from 'modules/_shared/components';
import { useServices } from 'modules/_shared/hooks';

export interface SeoInfoFormProps {
  initialValues?: Partial<ISeoInfo>;
  form?: FormInstance;
  asChild?: boolean;
  onChange?: (value: ISeoInfo) => void;
}

export const SeoInfoForm: React.FC<SeoInfoFormProps> = ({
  initialValues,
  asChild,
  form,
  onChange,
}) => {
  const { fileService } = useServices();
  return (
    <FormBuilder<ISeoInfo>
      initialValues={initialValues}
      asChild={asChild}
      form={form}
      gutter={[16, 16]}
      onValuesChange={onChange}
      formLayout="vertical"
      configs={{
        id: {
          formType: 'input-number',
          hidden: true,
        },
        title: {
          formType: 'input',
          label: 'Title',
          placeholder: 'Ex: The cao dien thoai Viettel',
        },
        shortDescription: {
          formType: 'textarea',
          label: 'Short Description',
          placeholder: 'Please enter short description of product',
          rows: 3,
          rules: [
            {
              max: 160,
              message: 'Short Description must be 160 characters',
            },
          ],
        },
        image: {
          formType: 'custom',
          label: 'Image',
          render: (props) => (
            <UploadImageFormItem
              {...(props as every)}
              onUpload={fileService.upload}
            />
          ),
        },
        keywords: {
          formType: 'custom',
          label: 'Keywords',
          render: (props) => {
            return <KeywordsFormInput {...(props as KeywordsFormInputProps)} />;
          },
        },
        canonical: {
          formType: 'input',
          label: 'Canonical',
          placeholder: 'Ex: https://example.com',
          rules: [
            {
              type: 'url',
              message: 'Please enter valid url',
            },
          ],
        },
        noIndex: {
          formType: 'checkbox',
          children:
            'No Index (This page will not be indexed by search engines)',
        },
      }}
      layouts={[
        {
          name: 'title',
          span: 24,
        },
        {
          type: 'group',
          breakpoints: { xs: 24, sm: 12, md: 18, lg: 20 },
          items: [
            {
              name: 'keywords',
              span: 24,
            },
            {
              name: 'canonical',
              span: 24,
            },
          ],
        },
        {
          name: 'image',
          breakpoints: { xs: 24, sm: 12, md: 6, lg: 4 },
        },
        {
          name: 'shortDescription',
          span: 24,
        },
        {
          name: 'noIndex',
          span: 24,
        },
        {
          name: 'id',
          span: 0,
        },
      ]}
    />
  );
};
