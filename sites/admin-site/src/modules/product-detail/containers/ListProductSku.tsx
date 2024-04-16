import React from 'react';
import { IProductSku } from '../types/product-skus';
import { Switch, Table } from 'antd';
import { ButtonIcon } from 'modules/_shared/components';
import { BiPencil } from 'react-icons/bi';
import { TbSeo } from 'react-icons/tb';
import { Flex } from '@packages/ds-core';
import { SeoInfoModal } from 'modules/seo-info/containers/SeoInfoModal';
import { UpsertSkuModal } from './UpsertSkuModal';
import { useProductSkus } from '../hooks';

export interface ListProductSkuProps {
  items?: IProductSku[];
}

export const ListProductSku: React.FC<ListProductSkuProps> = ({ items }) => {
  return (
    <div>
      <Table
        dataSource={items}
        pagination={false}
        columns={[
          {
            title: '#',
            key: 'id',
            render: (_, __, index: number) => index + 1,
          },
          {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'SKU',
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Sellable',
            dataIndex: 'sellable',
            render: (sellable: boolean) => <Switch defaultValue={sellable} />,
          },
          {
            title: 'Price',
            dataIndex: 'sellPrice',
            key: 'sellPrice',
          },
          {
            key: 'id',
            render: (_, productSku) => <Action productSku={productSku} />,
          },
        ]}
      />
    </div>
  );
};

const Action: React.FC<{ productSku: IProductSku }> = ({ productSku }) => {
  const { actionLoading, updateSku, updateSkuSeo } = useProductSkus();

  const [open, setOpen] = React.useState(false);
  const [openUpsert, setOpenUpsert] = React.useState(false);

  return (
    <React.Fragment>
      <Flex gapX="s8" justify="end">
        <ButtonIcon iconColor="success" onClick={() => setOpen(true)}>
          <TbSeo size={20} />
        </ButtonIcon>
        <ButtonIcon iconColor="primary300" onClick={() => setOpenUpsert(true)}>
          <BiPencil />
        </ButtonIcon>
      </Flex>
      <SeoInfoModal
        open={open}
        onClose={() => setOpen(false)}
        defaultValues={productSku.seoInfo}
        loading={actionLoading}
        onSubmit={(value) => updateSkuSeo(productSku.sku, value)}
      />
      <UpsertSkuModal
        defaultValues={productSku}
        open={openUpsert}
        onClose={() => setOpenUpsert(false)}
        mode="edit"
        title="Edit SKU"
        onSubmit={updateSku}
        loading={actionLoading}
      />
    </React.Fragment>
  );
};
