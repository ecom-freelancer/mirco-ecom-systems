import React from 'react';
import { DatePickerFormConfig } from '../types';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export interface FormItemDatePickerProps<T> {
  config: DatePickerFormConfig<T, keyof T>;
  value?: string;
  onChange?: (v) => void;
}

export const FormItemDatePicker = <T,>({
  config,
  value,
  onChange,
  ...props
}: FormItemDatePickerProps<T>) => {
  const { formType, dateFormat, ...rest } = config;
  return (
    <DatePicker
      style={{
        width: '100%',
      }}
      {...props}
      {...rest}
      picker="date"
      format="DD-MM-YYYY"
      defaultValue={value ? dayjs(value, dateFormat) : null}
      onChange={(date) => {
        const startTime = date
          ? dayjs(date?.[0] as never).format(dateFormat)
          : undefined;
        onChange?.(startTime);
      }}
    />
  );
};
