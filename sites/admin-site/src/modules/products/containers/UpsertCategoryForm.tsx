import { IProductCategory } from '../types';
import React from 'react';
import { Button, Col, Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FormSection } from 'modules/products/components/_shared';
import {
  CategoryBaseInfoForm,
  CategoryImagesForm,
  CategorySeoInfoForm,
} from 'modules/products/components/product-category';
import { FloatingWrapper } from 'modules/_shared/components';

interface UpsertCategoryFormProps {
  onSubmit: () => void;
  loading: boolean;
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
        (category.seoInfo?.keywords?.length as number) > 0
          ? category.seoInfo?.keywords
          : [],
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
      <Row gutter={[16, 16]} wrap>
        <Col span={24} lg={17}>
          <FormSection title="Base Info">
            <CategoryBaseInfoForm form={form} />
          </FormSection>
        </Col>
        <Col span={24} lg={7}>
          <FormSection title="Image">
            <CategoryImagesForm form={form} />
          </FormSection>
        </Col>
      </Row>
      <Row>
        <Col span={24} lg={17}>
          <FormSection title="SEO Information">
            <CategorySeoInfoForm form={form} />
          </FormSection>
        </Col>
      </Row>
      <FloatingWrapper>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </FloatingWrapper>
    </Form>
  );
};

export default UpsertCategoryForm;
