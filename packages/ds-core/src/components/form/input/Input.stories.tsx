import { Meta, Story } from '@storybook/react';
import { Input } from './Input';
import React from 'react';

export default {
  title: 'ds-core/Form',
} as Meta;

export const Default: Story = () => {
  return <Input label="UserName" />;
};

Default.storyName = 'Input';
