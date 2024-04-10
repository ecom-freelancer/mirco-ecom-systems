import { Progress, Table } from 'antd';
import { ButtonIcon, Section } from 'modules/_shared/components';
import React from 'react';
import { IJobImportInventory } from '../types/import-job';
import { IJobAction, IJobStatus } from 'modules/jobs/types';
import { getTime } from 'modules/_shared/helper';
import { Link } from 'react-router-dom';
import { Flex, Text } from '@packages/ds-core';
import { JobStatus } from 'modules/jobs/components';
import { MdChevronRight } from 'react-icons/md';
import { IoReload } from 'react-icons/io5';
export interface ListImportHistoryProps {
  className?: string;
  sku: string;
}

const mockData: IJobImportInventory[] = [
  {
    id: 1,
    jobKey: 'import_inventory_<sku>',
    action: IJobAction.import_inventory_sku,
    status: IJobStatus.completed,
    source:
      'https://docs.google.com/spreadsheets/d/11kiI5XVobJBtB4vnN8dn1i7-Fn5uCPeuNiUrrQuDKXs/edit#gid=0',
    totalTask: 100,
    completedTask: 50,
    failedTask: 10,
    executedAt: '2024-04-04 10:00:00',
    completedAt: '2021-10-10 10:00:00',
    title: 'Import Inventory',
  },
  {
    id: 2,
    jobKey: 'import_inventory_<sku>',
    action: IJobAction.import_inventory_sku,
    status: IJobStatus.processing,
    source:
      'https://docs.google.com/spreadsheets/d/11kiI5XVobJBtB4vnN8dn1i7-Fn5uCPeuNiUrrQuDKXs/edit#gid=0',
    totalTask: 100,
    completedTask: 50,
    failedTask: 10,
    executedAt: '2024-09-04 6:00:00',
    completedAt: '2021-10-10 10:00:00',
    title: 'Import Inventory',
  },
  {
    id: 3,
    jobKey: 'import_inventory_<sku>',
    action: IJobAction.import_inventory_sku,
    status: IJobStatus.pending,
    source:
      'https://docs.google.com/spreadsheets/d/11kiI5XVobJBtB4vnN8dn1i7-Fn5uCPeuNiUrrQuDKXs/edit#gid=0',
    totalTask: 100,
    completedTask: 50,
    failedTask: 10,
    executedAt: '2021-10-10 10:00:00',
    completedAt: '2021-10-10 10:00:00',
    title: 'Import Inventory',
  },
  {
    id: 4,
    jobKey: 'import_inventory_<sku>',
    action: IJobAction.import_inventory_sku,
    status: IJobStatus.failed,
    source:
      'https://docs.google.com/spreadsheets/d/11kiI5XVobJBtB4vnN8dn1i7-Fn5uCPeuNiUrrQuDKXs/edit#gid=0',
    totalTask: 100,
    completedTask: 50,
    failedTask: 10,
    executedAt: '2021-10-10 10:00:00',
    completedAt: '2021-10-10 10:00:00',
    title: 'Import Inventory',
  },
  {
    id: 4,
    jobKey: 'import_inventory_<sku>',
    action: IJobAction.import_inventory_sku,
    status: IJobStatus.canceled,
    source:
      'https://docs.google.com/spreadsheets/d/11kiI5XVobJBtB4vnN8dn1i7-Fn5uCPeuNiUrrQuDKXs/edit#gid=0',
    totalTask: 100,
    completedTask: 50,
    failedTask: 10,
    executedAt: '2021-10-10 10:00:00',
    completedAt: '2021-10-10 10:00:00',
    title: 'Import Inventory',
  },
];

export const ListImportHistory: React.FC<ListImportHistoryProps> = () => {
  return (
    <Section title="Import History" extra={[]}>
      <Table<IJobImportInventory>
        dataSource={mockData}
        columns={[
          {
            title: '#',
            render: (_, __, index) => index + 1,
          },

          {
            title: 'Time',
            dataIndex: 'executedAt',
            render: (value) => getTime(value),
          },
          {
            title: 'Title',
            render: (_, record) => record.title || 'Import Inventory',
            width: '15%',
          },
          {
            title: 'Task',
            dataIndex: 'totalTask',
            width: '10%',
          },
          {
            title: 'Status',
            render: (_, record) => <JobStatus status={record.status} />,
          },
          {
            title: 'Source',
            dataIndex: 'source',
            width: '20%',
            render: (value) => (
              <Link to={value} target="_blank">
                <Text maxLines={1} textOverflow="ellipsis">
                  {value}
                </Text>
              </Link>
            ),
          },

          {
            title: 'Progress',
            width: '15%',
            render: (_, record) => (
              <Progress
                status="exception"
                percent={
                  (((record.completedTask || 0) + (record.failedTask || 0)) /
                    (record.totalTask || 1)) *
                  100
                }
                success={{
                  percent:
                    ((record.completedTask || 0) / (record.totalTask || 1)) *
                    100,
                }}
              />
            ),
          },
          {
            render: () => (
              <Flex gapX="s12">
                <ButtonIcon iconColor="primary">
                  <MdChevronRight />
                </ButtonIcon>
                <ButtonIcon iconColor="warning">
                  <IoReload />
                </ButtonIcon>
              </Flex>
            ),
          },
        ]}
      />
    </Section>
  );
};

export default ListImportHistory;
