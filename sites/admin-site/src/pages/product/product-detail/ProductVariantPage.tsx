import { styled } from '@packages/ds-core';
import { Button, Col, Row } from 'antd';
import { Section } from 'modules/_shared/components';
import { Page } from 'modules/_shared/components/Page';
import {
  ListVariants,
  UpsertVariantModal,
  ListProductSku,
  UpsertSkuModal,
} from 'modules/product-detail';
import { useProductSkus, useVariants } from 'modules/product-detail/hooks';
import { IVariant } from 'modules/product-detail/types.ts/variant';
import React from 'react';

const ProductVariantPage: React.FC = () => {
  const {
    variants,
    loading: variantLoading,
    refresh,
    deleteVariant,
  } = useVariants();
  const { productSkus, actionLoading, createSku } = useProductSkus();

  const [openVariantModal, setOpenVariantModal] = React.useState<
    | false
    | true
    | {
        variant: IVariant;
      }
  >(false);

  const [openSkuModal, setOpenSkuModal] = React.useState(false);

  return (
    <Page>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={24}>
          <StyledSection
            title="SKU"
            extra={[
              <Button
                key="add-sku"
                type="link"
                onClick={() => setOpenSkuModal(true)}
              >
                Add SKU
              </Button>,
            ]}
          >
            <ListProductSku items={productSkus} />
          </StyledSection>
        </Col>
        <Col span={24} lg={24}>
          <StyledSection
            title="Variants"
            extra={[
              <Button
                key="add-variant"
                type="link"
                onClick={() => setOpenVariantModal(true)}
              >
                Add Variant
              </Button>,
            ]}
          >
            <ListVariants
              variants={variants}
              loading={variantLoading}
              onDelete={deleteVariant}
              onClickEdit={(v) =>
                setOpenVariantModal({
                  variant: v,
                } as every)
              }
            />
          </StyledSection>
        </Col>
      </Row>
      <UpsertVariantModal
        open={openVariantModal !== false}
        onClose={() => setOpenVariantModal(false)}
        title="Add a Variant"
        afterClose={refresh}
        defaultValues={(openVariantModal as every)?.variant}
      />
      <UpsertSkuModal
        open={openSkuModal}
        onClose={() => setOpenSkuModal(false)}
        title="Add SKU"
        allVariants={variants}
        onSubmit={createSku}
        loading={actionLoading}
      />
    </Page>
  );
};

const StyledSection = styled(Section)`
  margin-bottom: 1rem;
`;
export default ProductVariantPage;
