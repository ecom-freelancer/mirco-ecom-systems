import { IProductCategory } from '../types';
import React from 'react';
import { Col, Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FormSection } from '../components/_shared';
import {
  CategoryBaseInfoForm,
  CategoryImagesForm,
  CategorySeoInfoForm,
} from '../components/product-category';

interface UpsertCategoryFormProps {
  onSubmit: any;
  loading: any;
  category?: IProductCategory;
}

const generateInitialFormValues = (category: IProductCategory | undefined) => {
  if (!category) {
    return {
      id: null,
      name: '',
      code: '',
      image: '',
      display: true,
      order: null,
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

  return {
    id: category.id,
    name: category.name,
    code: category.code,
    image: category.image || '',
    display: category.display || true,
    order: category.order || null,
    seoInfo: {
      title: category.seoInfo?.title || '',
      shortDescription: category.seoInfo?.shortDescription || '',
      image: category.seoInfo?.image || '',
      keywords:
        category.seoInfo?.keywords.length > 0 ? category.seoInfo?.keywords : [],
      noIndex: category.seoInfo?.noIndex || true,
      canonical: category.seoInfo?.canonical || '',
    },
  };
};

const UpsertCategoryForm: React.FC<UpsertCategoryFormProps> = ({
  onSubmit,
  loading,
  category,
}) => {
  const [form] = useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={generateInitialFormValues(category)}
      scrollToFirstError={{
        behavior: 'smooth',
        block: 'center',
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} lg={17}>
          <FormSection title="Base Info">
            <CategoryBaseInfoForm />
          </FormSection>
        </Col>
        <Col span={24} lg={7}>
          <FormSection title="Images">
            <CategoryImagesForm />
          </FormSection>
        </Col>
        <Col span={24} lg={17}>
          <FormSection title="Seo Information">
            <CategorySeoInfoForm form={form} />
          </FormSection>
        </Col>
      </Row>
    </Form>
  );
};

export default UpsertCategoryForm;
