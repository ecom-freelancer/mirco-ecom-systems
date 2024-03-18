import React from 'react';
import { FormBuilderProps, IFormType } from './types';
import { Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';

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
    >
      <Row></Row>
    </Form>
  );
};
