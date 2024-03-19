import { FormInstance } from 'antd';
import { FormConfig } from './types';
import React from 'react';

export interface IFormBuilderContext<T = {}> {
  itemConfigs: FormConfig<T>;
  form?: FormInstance<T>;
}

export const FormBuilderContext = React.createContext<IFormBuilderContext>({
  itemConfigs: {},
});

export const useFormBuilder = <T extends {}>() =>
  React.useContext<IFormBuilderContext<T>>(FormBuilderContext as any);
