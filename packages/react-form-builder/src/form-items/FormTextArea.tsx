import React from 'react';
import { TextAreaFormItemConfig } from '../types';
import TextArea from 'antd/es/input/TextArea';

export interface FormItemInputProps<T> {
  config: TextAreaFormItemConfig<T, keyof T>;
}

export const FormItemTextArea = <T,>({
  config,
  ...props
}: FormItemInputProps<T>) => {
  const { formType, ...rest } = config;
  return <TextArea {...props} {...rest} />;
};
