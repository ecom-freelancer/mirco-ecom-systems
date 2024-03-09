import { TOptions } from 'i18next';
import i18n from '../i18n';

export const t = (key: string, opitons?: TOptions) =>
  i18n.t(key, { ...opitons, ns: 'translation' });
