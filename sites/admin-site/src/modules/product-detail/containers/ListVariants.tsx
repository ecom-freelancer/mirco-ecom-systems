import { Box, Flex, Text, styled } from '@packages/ds-core';
import { IVariant } from '../types/variant';
import { Popconfirm, Table, Tag } from 'antd';
import { ButtonIcon } from 'modules/_shared/components';
import { BiPencil, BiTrash } from 'react-icons/bi';
import React from 'react';

export interface ListVariantsProps {
  className?: string;
  variants?: IVariant[];
  loading?: boolean;
  onClickEdit?: (variant: IVariant) => void;
  onDelete?: (variantId: number) => void;
}

export const ListVariants: React.FC<ListVariantsProps> = ({
  className,
  variants,
  loading,
  onClickEdit,
  onDelete,
}) => {
  if (loading) {
    return <div className={className}>Loading...</div>;
  }

  if (!variants?.length) {
    return <div className={className}>No variants found</div>;
  }

  return (
    <Wrapper className={className}>
      <Table
        pagination={false}
        dataSource={variants}
        columns={[
          {
            title: '#',
            key: 'id',
            render: (_, __, index: number) => index + 1,
          },
          {
            title: 'Variant Attributes',
            dataIndex: 'name',
            key: 'name',
            render: (_, variant) => (
              <Flex align="center" gapX="s8">
                {variant.items?.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {index > 0 && <Text> + </Text>}
                    <Tag key={item.id} color="gold" style={{ marginRight: 0 }}>
                      {item.attributeOption?.name}
                    </Tag>
                  </React.Fragment>
                ))}
              </Flex>
            ),
          },
          {
            title: 'Linked to',
            dataIndex: 'sku',
            key: 'sku',
            render: (sku) =>
              sku ? <Tag color="success">{sku}</Tag> : <Tag>No SKU</Tag>,
          },
          {
            key: 'action',
            render: (_, variant) => (
              <Flex gap="s8" justify="end">
                <ButtonIcon
                  iconColor="primary300"
                  onClick={() => onClickEdit?.(variant)}
                >
                  <BiPencil />
                </ButtonIcon>
                <Popconfirm
                  title="Are you sure delete this variant?"
                  description="This can be change data in consumer website"
                  onConfirm={() => onDelete?.(variant.id!)}
                >
                  <ButtonIcon iconColor="error300">
                    <BiTrash />
                  </ButtonIcon>
                </Popconfirm>
              </Flex>
            ),
          },
        ]}
      />
    </Wrapper>
  );
};

const Wrapper = styled(Box)``;

export default ListVariants;
