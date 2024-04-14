import React, { useEffect, useState } from 'react';
import { Box, styled } from '@packages/ds-core';
import { Col, Row, Select } from 'antd';
import { IProductSku } from '../types/product-skus.ts';
import { useSkuInventoryDetail } from '../hooks';

interface ProductInventoryListProps {
  productSkus: IProductSku[];
}

const ProductInventoryList: React.FC<ProductInventoryListProps> = ({
  productSkus,
}) => {
  const [selectedSku, setSelectedSku] = useState<string>();

  const { skuInventoryDetail, isLoading, refresh } =
    useSkuInventoryDetail(selectedSku);

  return (
    <Wrapper>
      <FilterWrapper>
        <Row gutter={[16, 16]}>
          <Col span={24} md={8}>
            <Select
              placeholder="Choose a sku"
              value={selectedSku}
              options={(productSkus || []).map((e) => ({
                label: e.name,
                value: e.sku,
              }))}
              onChange={setSelectedSku}
              allowClear
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      </FilterWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  padding: ${({ theme }) => theme.spaces.s16};
`;

const FilterWrapper = styled(Box)`
  margin-bottom: ${({ theme }) => theme.spaces.s32};
`;

export default ProductInventoryList;
