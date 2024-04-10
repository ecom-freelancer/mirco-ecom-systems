import React from 'react';
import { Tag } from 'antd';
import { InventoryStatus } from '../types/inventory';

export interface EntityStatusProps {
  status: InventoryStatus;
}

const colors: Record<InventoryStatus, string> = {
  [InventoryStatus.enable]: 'green',
  [InventoryStatus.sold]: 'warning',
  [InventoryStatus.draft]: 'gray',
};

export const EntityStatus: React.FC<EntityStatusProps> = ({ status }) => {
  return <Tag color={colors[status]}>{status}</Tag>;
};
