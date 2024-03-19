import React from 'react';
import { CheckBoxGroupFormConfig } from '../types';
import { Checkbox } from 'antd';
import { Flex } from '@packages/ds-core';

export interface FormItemCheckBoxGroupProps<T> {
  config: CheckBoxGroupFormConfig<T, keyof T>;
}

export const FormItemCheckBoxGroup = <T,>({
  config,
  ...props
}: FormItemCheckBoxGroupProps<T>) => {
  return (
    <Checkbox.Group {...props}>
      <Flex direction="column">
        {Object.keys(config.options).map((optionKey, index) => (
          <Checkbox key={index} value={optionKey}>
            {config.options[optionKey]}
          </Checkbox>
        ))}
      </Flex>
    </Checkbox.Group>
  );
};
