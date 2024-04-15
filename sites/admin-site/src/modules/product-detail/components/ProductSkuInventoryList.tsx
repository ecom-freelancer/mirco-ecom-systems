import React, { useMemo } from 'react';
import { Box, styled } from '@packages/ds-core';
import { Col, Row, Select, Table, Tag } from 'antd';
import { IProductSku } from '../types/product-skus';
import {
  IGetInventoryEntityListParams,
  IInventoryEntity,
  ISkuInventoryDetail,
} from '../types';
import {
  InventoryStatus,
  inventoryStatuses,
} from 'configs/constants/inventory';
import dayjs from 'dayjs';

interface ProductInventoryListProps {
  loading: boolean;
  pageSize: number;
  totalRecord: number;
  productSkus: IProductSku[];
  skuInventoryDetail: ISkuInventoryDetail | null | undefined;
  selectedSku: string;
  inventoryEntityList: IInventoryEntity[];
  onSearchInventoryEntity: (
    params: Partial<IGetInventoryEntityListParams>,
  ) => void;
}

export const ProductSkuInventoryList: React.FC<ProductInventoryListProps> = ({
  loading,
  pageSize,
  totalRecord,
  productSkus,
  skuInventoryDetail,
  selectedSku,
  inventoryEntityList,
  onSearchInventoryEntity,
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
        render: (value: InventoryStatus) => {
          const statusInfo = inventoryStatuses.find(
            (status) => status.value === value,
          ) as Option;
          return <Tag color={statusInfo.color}>{value}</Tag>;
        },
      },
      {
        title: 'Created Date',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (value: Date) => (
          <span>{dayjs(value).locale('vi').format('DD-MM-YYYY HH:mm:ss')}</span>
        ),
      },
    ];
  }, []);

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
              onChange={(value: string) => {
                onSearchInventoryEntity({ sku: value, page: 1 });
              }}
              allowClear
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      </FilterWrapper>
      <Table
        loading={loading}
        columns={columns}
        dataSource={inventoryEntityList}
        rowKey="id"
        pagination={{
          defaultCurrent: 1,
          pageSize: pageSize,
          total: totalRecord,
          position: ['bottomCenter'],
          onChange: (value) => {
            onSearchInventoryEntity({ page: value });
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
