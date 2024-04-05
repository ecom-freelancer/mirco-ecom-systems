import React, { useMemo } from 'react';
import { FormItemLayout } from './types';
import { Col } from 'antd';
import { formItemMappings } from './form-item-mapping';
import { useFormItem } from './useFormItem';
import FormItem from 'antd/es/form/FormItem';
import { styled } from '@packages/ds-core';

export interface FormBuilderItemProps<T> {
  layout: FormItemLayout<T>;
}

export const FormBuilderItem = <T,>(props: FormBuilderItemProps<T>) => {
  const { span, breakpoints } = props.layout;
  const [itemConfig] = useFormItem(props.layout.name);
  const { label, rules, dependencies, formType, validateFirst } =
    itemConfig || {};

  const Input = useMemo(() => {
    if (!formType) return null;
    if (formType === 'custom') return ((itemConfig as any)?.render as any)!;
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
        validateFirst={validateFirst}
        required={itemConfig?.required}
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

  .ant-form-item-explain-connected {
    margin-top: 0.25rem !important;
  }
  .ant-form-item-explain-error:empty {
    margin: 0 !important;
  }
`;
