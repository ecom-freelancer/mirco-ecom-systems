import React from 'react';
import { TimePickerFormConfig } from '../types';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

export interface FormItemDatePickerProps<T> {
  config: TimePickerFormConfig<T, keyof T>;
  value?: string;
  onChange?: (v) => void;
}

export const FormItemTimePicker = <T,>({
  config,
  value,
  onChange,
  ...props
}: FormItemDatePickerProps<T>) => {
  const { formType, timeFormat, ...rest } = config;

  return (
    <TimePicker
      style={{
        width: '100%',
      }}
      {...props}
      {...rest}
      defaultValue={value ? dayjs(value, timeFormat) : null}
      onChange={(date) => {
        const startTime = date
          ? dayjs(date?.[0] as never).format(timeFormat)
          : undefined;
        onChange?.(startTime);
      }}
    />
  );
};
