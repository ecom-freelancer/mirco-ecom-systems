import React from 'react';
import { InputPasswordFormItemConfig } from '../types';
import Password from 'antd/es/input/Password';

export interface FormItemInputPasswordProps<T> {
  config: InputPasswordFormItemConfig<T, keyof T>;
}

export const FormItemInputPassword = <T,>({
  config,
  ...props
}: FormItemInputPasswordProps<T>) => {
  const { formType, ...rest } = config;
  return <Password {...rest} {...props} />;
};
