import { Meta } from '@storybook/react';
import { StatusAsync } from './StatusAsync';
import React from 'react';
import { Box } from '@packages/ds-core';

export default {
  title: 'react-user/component',
} as Meta;

export const Default = () => {
  return (
    <Box>
      <StatusAsync
        asyncFunc={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve('success');
            }, 2000);
          });
        }}
        trigger={1}
        messages={{
          success: 'The password is correct',
          loading: 'Checking the password...',
        }}
      />

      <StatusAsync
        asyncFunc={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve('warning');
            }, 2000);
          });
        }}
        trigger={1}
        messages={{
          warning: 'The password is not strong enough',
          loading: 'Checking the password...',
        }}
      />
      <StatusAsync
        asyncFunc={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve('error');
            }, 2000);
          });
        }}
        trigger={1}
        messages={{
          error: 'The password is correct',
          loading: 'Checking the password',
        }}
      />
    </Box>
  );
};

Default.storyName = 'StatusAsync';
