import { useForm } from 'antd/es/form/Form';
import { ProductBaseInfoForm, ProductAdvanceForm } from '../components';
import { Box, Heading, styled } from '@packages/ds-core';
import { Button, Col, Form, Row } from 'antd';
import { ProductImagesForm } from '../components/ProductImagesForm';
import { ProductAttributesForm } from '../components/ProductAttributesForm';
import { useCategories } from 'modules/products/product-category';

export const CreateProductForm = () => {
  const { categories } = useCategories();
  const [form] = useForm();

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={(e) => console.log(e)}
        validateTrigger="onBlur"
      >
        <Row gutter={[16, 16]}>
          <Col span={17}>
            <Section marginBottom="s16">
              <ProductBaseInfoForm form={form} allCategories={categories} />
            </Section>
            <Section>
              <ProductAttributesForm form={form} />
            </Section>
          </Col>
          <Col span={7}>
            <Section marginBottom="s16">
              <ProductAdvanceForm form={form} />
            </Section>
            <Section>
              <Heading type="h6">Images</Heading>
              <ProductImagesForm form={form} />
            </Section>
          </Col>
        </Row>
        <Box marginBottom="s16">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Box>
      </Form>
    </div>
  );
};

const Section = styled(Box)`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 1.25rem;
  border-radius: 0.5rem;
`;
