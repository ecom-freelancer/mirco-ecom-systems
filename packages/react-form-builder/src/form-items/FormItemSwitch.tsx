import React from 'react';
import { BaseFormItemProps, SwitchFormConfig } from '../types';
import { Switch } from 'antd';

export interface FormItemSwitchProps<T>
  extends BaseFormItemProps<SwitchFormConfig<T, keyof T>> {
  onChange?: (v) => void;
}

export const FormItemSwitch = <T,>({
  config,
  ...props
}: FormItemSwitchProps<T>) => {
  const { formType, ...rest } = config;
  return <Switch {...rest} {...props} />;
};
