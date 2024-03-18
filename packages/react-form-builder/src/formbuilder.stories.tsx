import { Meta } from '@storybook/react';
import React from 'react';

import { FormBuilder } from './FormBuilder';
import { FormBuilderProps } from './types';

export default {
  title: 'React-Form-Builder/FormBuilder',
} as Meta;

export interface FormType {
  username: string;
  password: string;
  email: string;
  dob: string;
  allowPublic: boolean;
  permision: {
    read: boolean;
    update: boolean;
    remove: boolean;
    create: boolean;
  };
  friendInfo: {
    name: string;
  };
  categories: Array<{
    username: string;
  }>;
  sexual?: 0 | 1 | 2;
}

const formProps: FormBuilderProps<FormType> = {
  configs: {
    username: {
      type: 'input',
    },
    password: {
      type: 'password',
    },
    permision: {
      type: 'checkbox-group',
    },
    categories: {},
  },
  layouts: [],
};

export const Default = () => {
  return <FormBuilder<FormType> {...formProps} />;
};
