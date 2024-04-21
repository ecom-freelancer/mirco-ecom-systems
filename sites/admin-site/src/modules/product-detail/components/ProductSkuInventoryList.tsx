import React, { useMemo, useState } from 'react';
import { Box, Heading, styled } from '@packages/ds-core';
import {
  Button,
  Col,
  DatePicker,
  Row,
  Select,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import {
  IGetInventoryEntityListParams,
  IInventoryEntity,
  ISkuInventoryDetail,
  ISkuInventoryDto,
} from '../types';
import {
  InventoryStatus,
  inventoryStatuses,
} from 'configs/constants/inventory';
import dayjs, { Dayjs } from 'dayjs';

interface ProductInventoryListProps {
  loading: boolean;
  pageSize: number;
  totalRecord: number;
  skuInventoryDetail: ISkuInventoryDetail | null | undefined;
  selectedSkuInventoryId: number | undefined;
  inventoryEntityList: IInventoryEntity[];
  onSearchInventoryEntity: (
    params: Partial<IGetInventoryEntityListParams>,
  ) => void;
  skuInventoryList: ISkuInventoryDto[] | undefined;
  onClickDetail: (inventoryEntity: IInventoryEntity) => void;
}

export const ProductSkuInventoryList: React.FC<ProductInventoryListProps> = ({
  loading,
  pageSize,
  totalRecord,
  skuInventoryDetail,
  selectedSkuInventoryId,
  inventoryEntityList,
  onSearchInventoryEntity,
  skuInventoryList,
  onClickDetail,
}) => {
  const [statuses, setStatuses] = useState<InventoryStatus[]>([]);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleClickFilter = () => {
    onSearchInventoryEntity({
      page: 1,
      pageSize,
      skuInventoryId: selectedSkuInventoryId,
      status: statuses,
      startDate: startDate?.format('YYYY-MM-DD') || undefined,
      endDate: endDate?.format('YYYY-MM-DD') || undefined,
    });
  };

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
      {
        title: 'Action',
        key: 'action',
        render: (_, inventoryEntity: IInventoryEntity) => {
          if (inventoryEntity.status === InventoryStatus.sold) {
            return (
              <Tooltip title="Cannot manually update sold entity">
                <Button type="link" disabled>
                  Detail
                </Button>
              </Tooltip>
            );
          }

          return (
            <Button type="link" onClick={() => onClickDetail(inventoryEntity)}>
              Detail
            </Button>
          );
        },
      },
    ];
  }, []);

  return (
    <Wrapper>
      <FilterWrapper>
        <SearchBarWrapper>
          <Row gutter={[16, 16]}>
            <Col span={24} md={8}>
              <Select
                placeholder="Choose a sku"
                value={selectedSkuInventoryId}
                options={(skuInventoryList || []).map((e) => ({
                  label: `${e.productSku?.name} - SKU: ${e.sku}`,
                  value: e.id,
                }))}
                onChange={(value: number) => {
                  onSearchInventoryEntity({ skuInventoryId: value, page: 1 });
                }}
                allowClear
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </SearchBarWrapper>
        <Row gutter={[16, 16]}>
          <Col span={24} md={4}>
            <Select
              value={statuses}
              placeholder="Select status"
              mode="tags"
              style={{ width: '100%' }}
              options={inventoryStatuses}
              allowClear
              onChange={setStatuses}
            />
          </Col>
          <Col span={24} md={4}>
            <DatePicker
              placeholder="Created date from"
              style={{ width: '100%' }}
              value={startDate}
              onChange={setStartDate}
            />
          </Col>
          <Col span={24} md={4}>
            <DatePicker
              placeholder="Created date to"
              style={{ width: '100%' }}
              value={endDate}
              onChange={setEndDate}
            />
          </Col>
          <Col span={24} md={4}>
            <Button
              type="primary"
              onClick={handleClickFilter}
              loading={loading}
            >
              Filter
            </Button>
          </Col>
        </Row>
        {!!skuInventoryDetail && (
          <CountWrapper gutter={[16, 16]}>
            <Col span={12} sm={6} md={2}>
              <CountNumberBox>
                <span>Available</span>
                <Heading type="h3">{skuInventoryDetail.totalAvailable}</Heading>
              </CountNumberBox>
            </Col>
            <Col span={12} sm={6} md={2}>
              <CountNumberBox>
                <span>Volume</span>
                <Heading type="h3">{skuInventoryDetail.totalVolume}</Heading>
              </CountNumberBox>
            </Col>
            <Col span={12} sm={6} md={2}>
              <CountNumberBox color="#c97521">
                <span>Draft</span>
                <Heading type="h3">
                  {skuInventoryDetail.countDetail.draft}
                </Heading>
              </CountNumberBox>
            </Col>
            <Col span={12} sm={6} md={2}>
              <CountNumberBox color="#fc3f48">
                <span>Disable</span>
                <Heading type="h3">
                  {skuInventoryDetail.countDetail.disable}
                </Heading>
              </CountNumberBox>
            </Col>
            <Col span={12} sm={6} md={2}>
              <CountNumberBox color="#000cf8">
                <span>Enable</span>
                <Heading type="h3">
                  {skuInventoryDetail.countDetail.enable}
                </Heading>
              </CountNumberBox>
            </Col>
            <Col span={12} sm={6} md={2}>
              <CountNumberBox color="#cdcdcd">
                <span>Sold</span>
                <Heading type="h3">
                  {skuInventoryDetail.countDetail.sold}
                </Heading>
              </CountNumberBox>
            </Col>
          </CountWrapper>
        )}
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
  margin-bottom: ${({ theme }) => theme.spaces.s8};
`;

const SearchBarWrapper = styled(Box)`
  margin-bottom: ${({ theme }) => theme.spaces.s8};
`;

const CountWrapper = styled(Row)`
  margin-top: ${({ theme }) => theme.spaces.s16};
  margin-bottom: ${({ theme }) => theme.spaces.s16};
`;

const CountNumberBox = styled(Box)(
  ({ color }) => `
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  color: ${color ? color : 'black'}
`,
);
