import { IProductCategory } from '../types';
import React from 'react';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { styled } from '@packages/ds-core';

interface UpsertCategoryFormProps {
  onSubmit: any;
  loading: any;
  category?: IProductCategory;
}

const generateInitialFormValues = (category: IProductCategory | undefined) => {
  if (!category) {
    return {
      name: '',
      code: '',
      image: '',
      display: true,
      seoInfo: {
        title: '',
        shortDescription: '',
        image: '',
        keywords: [],
        noIndex: false,
        canonical: '',
      },
    };
  }
};

const UpsertCategoryForm: React.FC<UpsertCategoryFormProps> = ({
  onSubmit,
  loading,
  category,
}) => {
  const [form] = useForm();

  return <Form form={form} layout="vertical" onFinish={onSubmit}></Form>;
};

export default UpsertCategoryForm;
