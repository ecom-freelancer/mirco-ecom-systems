import React from 'react';
import { CheckBoxFormConfig } from '../types';
import { Checkbox } from 'antd';

export interface FormItemCheckBoxProps<T> {
  config: CheckBoxFormConfig<T, keyof T>;
  value: boolean;
  onChange: (v: boolean) => void;
}

export const FormItemCheckBox = <T,>({
  config,
  value,
  onChange,
  ...props
}: FormItemCheckBoxProps<T>) => {
  const { formType, ...rest } = config;
  return (
    <Checkbox
      {...props}
      {...rest}
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};
