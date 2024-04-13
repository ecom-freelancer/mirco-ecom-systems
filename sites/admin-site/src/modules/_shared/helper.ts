import { IApiError } from './types.ts';
import { message } from 'antd';

export function stringToSlug(str: string) {
  return str
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '')
    .replace('đ', 'd') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-');
}

export const handleActionError = (e: IApiError | every, msg?: string) => {
  console.log(e);
  message.error(msg || e.message || 'Has error occurred, please try again');
};
