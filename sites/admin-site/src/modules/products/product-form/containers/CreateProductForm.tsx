import { useForm } from 'antd/es/form/Form';
import { ProductBaseInfoForm, ProductAdvanceForm } from '../components';
import { Box, Heading, styled } from '@packages/ds-core';
import { Col, Row } from 'antd';
import { ProductImagesForm } from '../components/ProductImagesForm';
import { ProductAttributesForm } from '../components/ProductAttributesForm';

export const CreateProductForm = () => {
  const [form] = useForm();

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={17}>
          <Section marginBottom="s16">
            <ProductBaseInfoForm form={form} />
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
            <ProductImagesForm />
          </Section>
        </Col>
      </Row>
    </div>
  );
};

const Section = styled(Box)`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 1.25rem;
  border-radius: 0.5rem;
`;
