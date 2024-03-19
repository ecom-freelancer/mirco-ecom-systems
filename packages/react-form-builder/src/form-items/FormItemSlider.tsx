import { Slider } from 'antd';
import { SliderFormConfig } from '../types';
import React from 'react';

export interface FormItemSliderProps<T> {
  config: SliderFormConfig<T, keyof T>;
}

export const FormItemSlider = <T,>({
  config,
  ...props
}: FormItemSliderProps<T>) => {
  const { formType, ...rest } = config;
  return <Slider range={false} {...rest} {...props} />;
};
