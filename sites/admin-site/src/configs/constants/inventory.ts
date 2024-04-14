import { t } from 'i18next';
import { InventoryStatus } from '@packages/nest-mysql';

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
