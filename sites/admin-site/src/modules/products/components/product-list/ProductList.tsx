import {
  GetListProductParams,
  IProductCategory,
  IProductInfo,
} from '../../types';
import React, { useMemo, useState } from 'react';
import {
  Input,
  Space,
  Table,
  Row,
  Col,
  Select,
  DatePicker,
  Button,
  Tag,
} from 'antd';
import { Link } from 'react-router-dom';
import { styled, Box } from '@packages/ds-core';
import { ProductStatus, productStatuses } from 'configs/constants/product.ts';
import { Dayjs } from 'dayjs';

export interface ProductListProps {
  products: IProductInfo[];
  loading: boolean;
  totalRecord: number;
  categories: IProductCategory[];
  onSearchProducts: (params?: Partial<GetListProductParams>) => Promise<void>;
  pageSize: number;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  totalRecord,
  categories,
  onSearchProducts,
  pageSize,
}) => {
  const columns = useMemo(() => {
    return [
      {
        title: '#',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: 'Slug',
        key: 'slug',
        dataIndex: 'slug',
      },
      { title: 'Brand', key: 'brand', dataIndex: 'brand' },
      {
        title: 'Keywords',
        key: 'keywords',
        dataIndex: 'keywords',
        render: (_, product: IProductInfo) => (
          <>
            {product?.keywords?.map((item, index) => (
              <Tag key={index}>{item}</Tag>
            ))}
          </>
        ),
      },
      {
        title: 'Status',
        key: 'productStatus',
        dataIndex: 'productStatus',
        render: (_, product: IProductInfo) => {
          const statusInfo = productStatuses.find(
            (status) => status.value === product.productStatus,
          ) as Option;
          return <Tag color={statusInfo.color}>{statusInfo.value}</Tag>;
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, product: IProductInfo) => (
          <Space size="middle">
            <Link to={`/products/${product.id}`}>Detail</Link>
          </Space>
        ),
      },
    ];
  }, []);
  const [categoryId, setCategoryId] = useState(null);
  const [statuses, setStatuses] = useState<ProductStatus[]>([]);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // when filter is changed, should set back to page 1
  const handleClickFilter = async () => {
    await onSearchProducts({
      categoryId: categoryId || undefined,
      productStatus: statuses,
      startDate: startDate?.format('YYYY-MM-DD') || undefined,
      endDate: endDate?.format('YYYY-MM-DD') || undefined,
    });
  };

  const handleKeywordChange = async (value: string) =>
    await onSearchProducts({ searchText: value });

  return (
    <>
      <FilterWrapper>
        <SearchBarWrapper>
          <Row gutter={[16, 16]}>
            <Col span={24} md={8}>
              <Input.Search
                enterButton
                onSearch={(value) => handleKeywordChange(value.trim())}
                loading={loading}
                placeholder="Search by name, slug, brand..."
              />
            </Col>
          </Row>
        </SearchBarWrapper>
        <Row gutter={[16, 16]}>
          <Col span={24} md={4}>
            <Select
              value={categoryId}
              placeholder="Filter by category"
              style={{ width: '100%' }}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
              onChange={setCategoryId}
              allowClear
            />
          </Col>
          <Col span={24} md={4}>
            <Select
              value={statuses}
              placeholder="Filter by product status"
              mode="tags"
              style={{ width: '100%' }}
              options={productStatuses}
              allowClear
              onChange={setStatuses}
            />
          </Col>
          <Col span={24} md={4}>
            <DatePicker
              placeholder="Filter by created date start"
              style={{ width: '100%' }}
              value={startDate}
              onChange={setStartDate}
            />
          </Col>
          <Col span={24} md={4}>
            <DatePicker
              placeholder="Filter by created date end"
              style={{ width: '100%' }}
              value={endDate}
              onChange={setEndDate}
            />
          </Col>
          <Col span={24} md={2}>
            <Button
              type="primary"
              onClick={handleClickFilter}
              loading={loading}
            >
              Filter
            </Button>
          </Col>
        </Row>
      </FilterWrapper>
      <Table
        loading={loading}
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{
          defaultCurrent: 1,
          pageSize: pageSize,
          total: totalRecord,
          position: ['bottomCenter'],
          onChange: async (value) => {
            await onSearchProducts({ page: value });
          },
        }}
        // expandable={{
        //   expandedRowRender: (record) => (
        //     <p style={{ margin: 0 }}>{record.description}</p>
        //   ),
        // }}
      />
    </>
  );
};

const FilterWrapper = styled(Box)`
  margin-top: ${({ theme }) => theme.spaces.s32};
  margin-bottom: ${({ theme }) => theme.spaces.s32};
`;

const SearchBarWrapper = styled(Box)`
  margin-top: ${({ theme }) => theme.spaces.s32};
  margin-bottom: ${({ theme }) => theme.spaces.s32};
`;

export default ProductList;
