// storybook with box component
import { Meta } from '@storybook/react';

import { Box } from '../components/Box';

export default {
  title: 'Box',
  component: Box,
} as Meta;

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};
