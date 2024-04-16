import { t } from 'i18next';

export enum InventoryStatus {
  draft = 'draft',
  disable = 'disable',
  enable = 'enable',
  sold = 'sold',
}

export const inventoryStatuses: Option[] = [
  {
    value: InventoryStatus.draft,
    label: t('draft'),
    color: 'gold',
  },
  {
    value: InventoryStatus.disable,
    label: t('disable'),
    color: 'error',
  },
  {
    value: InventoryStatus.enable,
    label: t('enable'),
    color: 'processing',
  },
  {
    value: InventoryStatus.sold,
    label: t('sold'),
    color: 'default',
  },
];
