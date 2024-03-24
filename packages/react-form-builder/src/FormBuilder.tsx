import React from 'react';
import { FormBuilderProps, IFormType } from './types';
import { Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FormBuilderContext } from './FormBuilderProvider';
import { FormBuilderItem } from './FormBuilderItem';

export const FormBuilder = <T extends IFormType>(
  props: FormBuilderProps<T>,
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
  } = props;

  const layouts = props.layouts;
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
    >
      <FormBuilderContext.Provider
        value={{
          itemConfigs: props.configs,
          form,
        }}
      >
        <Row gutter={[8, 8]}>
          {layouts.map((layout, index) => {
            return <FormBuilderItem key={index} layout={layout} />;
          })}
        </Row>
      </FormBuilderContext.Provider>
    </Form>
  );
};
