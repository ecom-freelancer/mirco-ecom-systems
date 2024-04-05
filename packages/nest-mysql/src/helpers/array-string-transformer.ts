import { ValueTransformer } from 'typeorm';

export const ArrayStringTransformer: ValueTransformer = {
  to: (value?: Array<string>) => value?.join(',') || '',
  from: (value?: string) => value?.split(',')?.filter((i) => !!i) || [],
};
