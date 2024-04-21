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
  Popover,
} from 'antd';
import { Link } from 'react-router-dom';
import { styled, Box } from '@packages/ds-core';
import { ProductStatus, productStatuses } from 'configs/constants/product.ts';
import { Dayjs } from 'dayjs';
import {
  EditOutlined,
  StopOutlined,
  CheckOutlined,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';

export interface ProductListProps {
  products: IProductInfo[];
  loading: boolean;
  totalRecord: number;
  categories: IProductCategory[];
  onSearchProducts: (params?: Partial<GetListProductParams>) => void;
  pageSize: number;
  onBatchUpdateProductStatus: (
    ids: number[],
    status: ProductStatus,
  ) => Promise<void>;
}

const WarningContent = () => (
  <>
    <ExclamationCircleTwoTone twoToneColor="#ff9966" />
    <span style={{ marginLeft: '4px' }}>
      Your customers cannot view these products after this action
    </span>
  </>
);

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  totalRecord,
  categories,
  onSearchProducts,
  pageSize,
  onBatchUpdateProductStatus,
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  // when filter is changed, should set back to page 1
  const handleClickFilter = async () => {
    onSearchProducts({
      page: 1,
      pageSize,
      categoryId: categoryId || undefined,
      productStatus: statuses,
      startDate: startDate?.format('YYYY-MM-DD') || undefined,
      endDate: endDate?.format('YYYY-MM-DD') || undefined,
    });
  };

  const handleKeywordChange = (value: string) =>
    onSearchProducts({ searchText: value });

  const handleClickStatusButton = async (status: ProductStatus) => {
    await onBatchUpdateProductStatus(selectedRowKeys, status);
    setSelectedRowKeys([]);
    // trigger reload product list
    onSearchProducts({});
  };

  return (
    <>
      <FilterWrapper>
        <ActionRow>
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
        </ActionRow>
        <ActionRow>
          <Row gutter={[16, 16]}>
            <Col span={24} md={4}>
              <Select
                value={categoryId}
                placeholder="Category"
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
                placeholder="Product status"
                mode="tags"
                style={{ width: '100%' }}
                options={productStatuses}
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
        </ActionRow>
        {selectedRowKeys.length > 0 && (
          <ActionRow>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <BatchUpdateStatusButtonGroups display="flex">
                  <Popover title="Set to draft?" content={WarningContent}>
                    <Button
                      icon={<EditOutlined />}
                      type="default"
                      onClick={() =>
                        handleClickStatusButton(ProductStatus.draft)
                      }
                    >
                      Set to draft
                    </Button>
                  </Popover>
                  <Popover title="Set hidden?" content={WarningContent}>
                    <Button
                      icon={<StopOutlined />}
                      danger
                      onClick={() =>
                        handleClickStatusButton(ProductStatus.hide)
                      }
                    >
                      Set hidden
                    </Button>
                  </Popover>
                  <Button
                    icon={<CheckOutlined />}
                    type="primary"
                    onClick={() =>
                      handleClickStatusButton(ProductStatus.published)
                    }
                  >
                    Set published
                  </Button>
                </BatchUpdateStatusButtonGroups>
              </Col>
            </Row>
          </ActionRow>
        )}
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
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys as number[]);
          },
        }}
      />
    </>
  );
};

const FilterWrapper = styled(Box)`
  margin-bottom: ${({ theme }) => theme.spaces.s8};
`;

const ActionRow = styled(Box)`
  margin-bottom: ${({ theme }) => theme.spaces.s8};
`;

const BatchUpdateStatusButtonGroups = styled(Box)`
  column-gap: ${({ theme }) => theme.spaces.s8};
`;

export default ProductList;
