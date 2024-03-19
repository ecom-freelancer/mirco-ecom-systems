import React from 'react';
import { InputFormItemConfig } from '../types';
import Input from 'antd/es/input/Input';

export interface FormItemInputProps<T> {
  config: InputFormItemConfig<T, keyof T>;
}

export const FormItemInput = <T,>({
  config,
  ...props
}: FormItemInputProps<T>) => {
  const { formType, ...rest } = config;
  return <Input {...props} {...rest} />;
};
