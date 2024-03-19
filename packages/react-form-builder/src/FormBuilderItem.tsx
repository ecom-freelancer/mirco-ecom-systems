import React, { useMemo } from 'react';
import { FormLayout } from './types';
import { Col } from 'antd';
import { formItemMappings } from './form-item-mapping';
import { useFormItem } from './useFormItem';
import FormItem from 'antd/es/form/FormItem';
import { styled } from '@packages/ds-core';

export interface FormBuilderItemProps<T> {
  layout: FormLayout<T>;
}

export const FormBuilderItem = <T,>(props: FormBuilderItemProps<T>) => {
  const { span, breakpoints } = props.layout;
  const [itemConfig] = useFormItem(props.layout.name);
  const { label, rules, dependencies, formType } = itemConfig || {};

  const Input = useMemo(() => {
    if (!formType) return null;
    return formItemMappings[formType];
  }, [formType]);

  return (
    <Col span={span} {...breakpoints}>
      <StyledFormItem
        label={label}
        rules={rules}
        dependencies={dependencies}
        name={props.layout.name}
        labelCol={props.layout.labelCol}
        labelAlign={props.layout.labelAlign || 'left'}
      >
        {Input && <Input config={itemConfig as any} />}
      </StyledFormItem>
    </Col>
  );
};

const StyledFormItem = styled(FormItem)`
  margin-bottom: 0.25rem !important;

  .ant-form-item-explain-error,
  .ant-form-item-explain-success {
    font-size: ${({ theme }) => theme.fontSizes.xs} !important;
  }

  .ant-form-item-explain-error:empty {
    margin: 0 !important;
  }
`;
