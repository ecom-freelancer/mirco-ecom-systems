import { t } from 'i18next';

export enum ProductStatus {
  draft = 'draft',
  published = 'published',
  hide = 'hide',
}

export const productStatuses: Option[] = [
  {
    value: ProductStatus.draft,
    label: t('draft'),
    color: 'gold',
  },
  {
    value: ProductStatus.published,
    label: t('published'),
    color: 'success',
  },
  {
    value: ProductStatus.hide,
    label: t('hide'),
    color: 'error',
  },
];

export enum ProductDeliveryType {
  only_by_email = 'only_by_email',
}

export const deliveryOptions: Option[] = [
  {
    value: ProductDeliveryType.only_by_email,
    label: t('Online By Email'),
    color: 'gold',
  },
];
