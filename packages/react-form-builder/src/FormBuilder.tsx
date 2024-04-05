import React, { useMemo } from 'react';
import { FormBuilderProps, FormGroupLayout, IFormType } from './types';
import { Col, Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FormBuilderContext, useFormBuilder } from './FormBuilderProvider';
import { FormBuilderItem } from './FormBuilderItem';

export const FormBuilder = <T extends IFormType>(
  props: FormBuilderProps<T>,
) => {
  const { asChild } = props;
  const layouts = props.layouts;

  const Wrapper: React.FC<
    FormBuilderProps<any> & { children: React.ReactNode }
  > = useMemo(() => (!asChild ? FormWrapper : React.Fragment), [asChild]);

  return (
    <Wrapper {...(asChild ? {} : (props as any))}>
      <FormBuilderContext.Provider
        value={{
          itemConfigs: props.configs,
          gutter: props.gutter || [8, 8],
        }}
      >
        <Row gutter={props.gutter || [8, 8]}>
          {layouts.map((layout, index) => {
            return layout.type === 'group' ? (
              <FormGroupBuilderLayout {...layout} key={index} />
            ) : (
              <FormBuilderItem key={index} layout={layout} />
            );
          })}
        </Row>
      </FormBuilderContext.Provider>
    </Wrapper>
  );
};

const FormGroupBuilderLayout: React.FC<FormGroupLayout<any>> = ({
  span = 24,
  items,
  breakpoints,
}) => {
  const { gutter } = useFormBuilder();
  return (
    <Col span={span} {...breakpoints}>
      <Row gutter={gutter}>
        {items.map((layout, index) => {
          return <FormBuilderItem key={index} layout={layout} />;
        })}
      </Row>
    </Col>
  );
};

const FormWrapper = (
  props: FormBuilderProps<any> & {
    children: React.ReactNode;
  },
) => {
  const {
    initialValues,
    form: control,
    onSubmit,
    onValuesChange,
    formLayout,
    validateTrigger,
    hideColon,
    disabled,
    children,
  } = props;
  const [form] = useForm(control);

  return (
    <Form
      form={form}
      initialValues={{ ...initialValues }}
      onFinish={onSubmit}
      onValuesChange={onValuesChange}
      validateTrigger={validateTrigger}
      layout={formLayout}
      colon={!hideColon}
      autoComplete="off"
      disabled={disabled}
      spellCheck={false}
    >
      {children}
    </Form>
  );
};
