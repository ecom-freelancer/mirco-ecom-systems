import React from 'react';
import { RadioFormConfig } from '../types';
import { Radio } from 'antd';

export interface FormItemRadioGroupProps<T> {
  config: RadioFormConfig<T, keyof T>;
  value: boolean;
  onChange: (v: boolean) => void;
}

export const FormItemRadioGroup = <T,>({
  config,
  value,
  onChange,
  ...props
}: FormItemRadioGroupProps<T>) => {
  const { formType, ...rest } = config;
  return <Radio.Group {...props} {...rest} />;
};
