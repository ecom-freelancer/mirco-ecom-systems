import React, { useMemo, useState } from 'react';
import { Box, styled } from '@packages/ds-core';
import { Col, Row, Select, Table, Tag } from 'antd';
import { IProductSku } from '../types/product-skus.ts';
import { useInventoryEntityList, useSkuInventoryDetail } from '../hooks';
import { IGetInventoryEntityListParams, IInventoryEntity } from '../types';
import { inventoryStatuses } from 'configs/constants/inventory.ts';

interface ProductInventoryListProps {
  productSkus: IProductSku[];
}

const ProductInventoryList: React.FC<ProductInventoryListProps> = ({
  productSkus,
}) => {
  const columns = useMemo(() => {
    return [
      {
        title: '#',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: 'Code',
        key: 'barCode',
        dataIndex: 'barCode',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, entity: IInventoryEntity) => {
          const statusInfo = inventoryStatuses.find(
            (status) => status.value === entity.status,
          ) as Option;
          return <Tag color={statusInfo.color}>{statusInfo.value}</Tag>;
        },
      },
    ];
  }, []);

  const [selectedSku, setSelectedSku] = useState<string>();
  const [params, setParams] = useState<Partial<IGetInventoryEntityListParams>>({
    page: 1,
    pageSize: 10,
  });
  const [pageSize, setPageSize] = useState<number>(10);

  const {
    skuInventoryDetail,
    isLoading: isLoadingSkuInventory,
    refresh,
  } = useSkuInventoryDetail(selectedSku);

  const {
    inventoryEntityList,
    totalRecord,
    isLoading: isLoadingInventoryEntityList,
  } = useInventoryEntityList(selectedSku, params);

  const onSearchInventoryEntity = (
    payload: Partial<IGetInventoryEntityListParams>,
  ) => {
    setParams(payload);
  };

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
      <Table
        loading={isLoadingSkuInventory || isLoadingInventoryEntityList}
        columns={columns}
        dataSource={inventoryEntityList}
        rowKey="id"
        pagination={{
          defaultCurrent: 1,
          pageSize: params.pageSize,
          total: totalRecord,
          position: ['bottomCenter'],
          onChange: async (value) => {
            await onSearchInventoryEntity({ page: value });
          },
        }}
      />
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
