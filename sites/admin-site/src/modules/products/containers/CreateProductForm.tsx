import { useForm } from 'antd/es/form/Form';
import { styled } from '@packages/ds-core';
import { Button, Col, Form, Row } from 'antd';
import { useCategories } from 'modules/products/hooks';

import {
  ProductAdvanceForm,
  ProductAttributesForm,
  ProductBaseInfoForm,
  ProductSeoInfoItem,
} from '../components/product-form';
import { ProductImagesForm } from '../components/product-form/ProductImagesForm';
import { IProductInfoFormType } from '../types';
import React from 'react';
import { FormSection } from '../components/_shared';

export interface ProductInfoFormFormProps {
  initialValues?: Partial<IProductInfoFormType>;
  onSubmit?: (values: IProductInfoFormType) => Promise<void> | void;
  loading?: boolean;
}

export const ProductInfoForm: React.FC<ProductInfoFormFormProps> = ({
  onSubmit,
  loading,
  initialValues,
}) => {
  const { categories } = useCategories();
  const [form] = useForm();

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
        scrollToFirstError={{
          behavior: 'smooth',
          block: 'center',
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24} lg={17}>
            <FormSection>
              <ProductBaseInfoForm
                form={form}
                allCategories={categories}
                asChild
              />
            </FormSection>
          </Col>
          <Col span={24} lg={7}>
            <FormSection>
              <ProductAdvanceForm form={form} />
            </FormSection>
            <FormSection title="Images">
              <ProductImagesForm form={form} />
            </FormSection>
          </Col>
          <Col span={24} lg={17}>
            <FormSection title="Attributes">
              <ProductAttributesForm form={form} asChild />
            </FormSection>
            <FormSection title="SEO Information">
              <ProductSeoInfoItem form={form} />
            </FormSection>
          </Col>
        </Row>
        <ButtonSubmitWrapper>
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
        </ButtonSubmitWrapper>
      </Form>
    </div>
  );
};

const ButtonSubmitWrapper = styled.div`
  position: fixed;
  bottom: -10px;
  right: 30px;
`;
