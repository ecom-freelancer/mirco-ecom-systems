import { Space } from '@packages/ds-core/dist/theme/token';
import { FormInstance, Rule } from 'antd/es/form';

export interface IFormType {}

export interface IFormItemProps<Key extends keyof T, T> {
  value?: T[Key];
  onChange?: (value: T[Key]) => void;
}

export type IFormItemTypeType =
  | 'input'
  | 'password'
  | 'select'
  | 'multiSelect'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'dateRange'
  | 'switch';

export interface FormOption<T> {
  label: string;
  value: T;
}

export type BaseFormItem<T extends IFormType, K extends keyof T> = {
  label?: string;
  rules?: Rule[];
  dependencies?: Omit<keyof T, K>[];
  allowClear?: boolean;
};

export type ValueKey<K, T> = K extends keyof T ? T[K] : never;
export type ArrayValueKey<K, T> = ValueKey<K, T> extends []
  ? ValueKey<K, T>
  : never;

export type FormItemConfig<T, K> = number;

export interface InputFormItemConfig<T, K extends keyof T>
  extends BaseFormItem<T, K> {
  type: 'input';
}

export interface InputPasswordFormItemConfig<T, K extends keyof T>
  extends BaseFormItem<T, K> {
  type: 'password';
}

export interface CheckBoxFormConfig<T, K extends keyof T>
  extends BaseFormItem<T, K> {
  type: 'checkbox';
  checkBoxLabel?: string;
}

export interface SelectFormConfig<T, K extends keyof T>
  extends BaseFormItem<T, K> {
  type: 'select';
}

export interface CheckBoxGroupFormConfig<T, K extends keyof T>
  extends BaseFormItem<T, K> {
  type: 'checkbox-group';
}

export interface FileUploadFormConfig<T, K extends keyof T>
  extends BaseFormItem<T, K> {
  type: 'file-upload';
}

export interface MultiFileUploadFormConfig<T, K extends keyof T>
  extends BaseFormItem<T, K> {
  type: 'multi-file-upload';
}

export interface RadioFormConfig<T, K extends keyof T>
  extends BaseFormItem<T, K> {
  type: 'radio';
  radioLayout?: 'horizontal' | 'vertical';
  inputType: 'radio' | 'checkbox';
}
export interface MultiSelectFormItemConfig<T, K extends keyof T>
  extends BaseFormItem<T, K> {}

export type AllowConfig<T, K extends keyof T> = ValueKey<K, T> extends any[]
  ? ValueKey<K, T> extends string[]
    ? MultiFileUploadFormConfig<T, K> | MultiSelectFormItemConfig<T, K>
    : MultiSelectFormItemConfig<T, K>
  : ValueKey<K, T> extends boolean
  ? CheckBoxFormConfig<T, K>
  : ValueKey<K, T> extends { [key: string]: boolean }
  ? CheckBoxGroupFormConfig<T, K>
  :
      | InputFormItemConfig<T, K>
      | InputPasswordFormItemConfig<T, K>
      | RadioFormConfig<T, K>
      | SelectFormConfig<T, K>
      | FileUploadFormConfig<T, K>;

export type FormConfig<T> = {
  [K in keyof T]?: AllowConfig<T, K>;
};

export type FormLayout<T> = {
  name: keyof T;
  span?: number;
  breakpoints?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
};

export interface FormBuilderProps<T extends IFormType> {
  form?: FormInstance<T>;
  configs: FormConfig<T>;
  layouts: FormLayout<T>[];
  space?: Space;
  formLayout?: 'horizontal' | 'vertical';
  hideColon?: boolean;
  onSubmit?: (values: T) => void;
  validateTrigger?: 'onChange' | 'onBlur' | 'onSubmit';
  initialValues?: T;
  onValuesChange?: (changedValues: Partial<T>, allValues: T) => void;
}
