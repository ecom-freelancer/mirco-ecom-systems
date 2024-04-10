import { Table } from 'antd';
import Search from 'antd/es/input/Search';
import { ButtonIcon, Section } from 'modules/_shared/components';
import React from 'react';
import { useSkuInventories } from '../hooks/useSkuInventories';
import { Flex, Text } from '@packages/ds-core';
import { EntityStatus } from '../components';
import { BiPencil, BiTrashAlt } from 'react-icons/bi';
import { getTime } from 'modules/_shared/helper';

export interface ListInventoryEntitiesProps {
  className?: string;
  sku: string;
}

export const ListInventoryEntities: React.FC<ListInventoryEntitiesProps> = ({
  sku,
}) => {
  const { items, loading, total } = useSkuInventories(sku!, {
    page: 1,
    pageSize: 10,
  });

  return (
    <Section title="Entities" extra={[<Search placeholder="search" />]}>
      <Table
        style={{ backgroundColor: 'white' }}
        loading={loading}
        dataSource={items}
        pagination={{
          total: total,
          pageSize: 10,
          current: 1,
        }}
        scroll={{
          y: 400,
        }}
        rowSelection={{
          type: 'checkbox',
        }}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Code',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
            render: (_, record) => (
              <Text maxLines={1} textOverflow="ellipsis">
                {record.barCode}
              </Text>
            ),
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
              return <EntityStatus status={status} />;
            },
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (time) => getTime(time),
          },
          {
            title: 'Action',
            render: () => {
              return (
                <Flex gapX="s8">
                  <ButtonIcon iconColor="primary">
                    <BiPencil />
                  </ButtonIcon>
                  <ButtonIcon iconColor="error">
                    <BiTrashAlt />
                  </ButtonIcon>
                </Flex>
              );
            },
          },
        ]}
      />
    </Section>
  );
};

export default ListInventoryEntities;
