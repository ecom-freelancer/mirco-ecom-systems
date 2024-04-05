import { FormConfig } from './types';
import React from 'react';

export interface IFormBuilderContext<T = {}> {
  itemConfigs: FormConfig<T>;
  gutter: number | [number, number];
}

export const FormBuilderContext = React.createContext<IFormBuilderContext>({
  itemConfigs: {},
  gutter: [8, 8],
});

export const useFormBuilder = <T extends {}>() =>
  React.useContext<IFormBuilderContext<T>>(FormBuilderContext as any);
