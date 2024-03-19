import { Meta } from '@storybook/react';
import React from 'react';

import { FormBuilder } from './FormBuilder';
import { FormBuilderProps } from './types';
import { Box, styled } from '@packages/ds-core';

export default {
  title: 'Form-Builder/FormBuilder',
} as Meta;

export interface FormType {
  password: string;
  email: string;
  dob: string;
  allowPublic: boolean;
  permision: ('read' | 'update' | 'remove' | 'create')[];
  friendInfo: {
    name: string;
  };
  sexual?: 0 | 1 | 2;
  activeTime?: string;
  active: boolean;
  tall: number;
  category: string;
}

const formProps: FormBuilderProps<FormType> = {
  configs: {
    email: {
      formType: 'input',
      label: 'Username',
      rules: [
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
      ],
    },
    password: {
      formType: 'password',
      label: 'password',
    },
    allowPublic: {
      formType: 'checkbox',
      children: 'Allow public to see my profile',
      label: <></>,
    },
    permision: {
      formType: 'checkbox-group',
      label: 'Permision',
      options: {
        read: 'Allow user can read my data of system',
        update: 'Allow user can update my data of system',
        remove: 'Allow user can remove my data of system',
        create: 'Allow user can create my data of system',
      },
    },
    dob: {
      label: 'Date of birth',
      formType: 'date',
    },
    category: {
      formType: 'select',
      label: 'Category',
      placeholder: 'Please select a category',

      options: [
        {
          label: 'Active',
          value: 1,
        },
        {
          label: 'Deactive',
          value: 0,
        },
      ],
    },
    activeTime: {
      formType: 'time',
      label: <></>,
      showNow: false,
    },
    active: {
      formType: 'switch',
      label: 'Status',
    },
    tall: {
      formType: 'slider',
      label: 'Tall',
      min: 10,
      max: 100,
      tooltip: {
        open: true,
        placement: 'bottom',
      },
    },
    sexual: {
      formType: 'radio',
      label: 'Sexual',
      options: [
        {
          label: 'Male',
          value: 1,
        },
        {
          label: 'Female',
          value: 0,
        },
        {
          label: 'Other',
          value: 2,
        },
      ],
    },
  },
  layouts: [
    {
      name: 'email',
      span: 24,
      labelCol: { span: 6 },
    },
    {
      name: 'password',
      span: 24,
      labelCol: { span: 6 },
    },
    {
      name: 'category',
      span: 24,
      labelCol: { span: 6 },
    },
    {
      name: 'allowPublic',
      span: 24,
      labelCol: { span: 6 },
    },
    {
      name: 'permision',
      span: 24,
      labelCol: { span: 6 },
    },

    {
      name: 'sexual',
      span: 24,
      labelCol: { span: 6 },
    },
    {
      name: 'dob',
      span: 18,
      labelCol: { span: 8 },
    },
    {
      name: 'activeTime',
      span: 6,
    },
    {
      name: 'active',
      span: 24,
      labelCol: { span: 6 },
    },
    {
      name: 'tall',
      span: 24,
      labelCol: { span: 6 },
    },
  ],
  formLayout: 'horizontal',
  onValuesChange(changedValues, allValues) {
    console.log(changedValues, allValues);
  },

  initialValues: {
    email: 'nguyenthaitiep206@gmail.com',
    dob: '2024-03-19T15:37:53+07:00',
    allowPublic: false,
    tall: 50,
  },
  hideColon: true,
};

export const Default = () => {
  return (
    <Wrapper>
      <FormBuilder<FormType> {...formProps} />
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  background-color: ${({ theme }) => theme.colors?.background};
  border-radius: ${({ theme }) => theme.radius?.r16};
  width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;
