/** story of Login Form */
import React from 'react';
import { Box, styled } from '@packages/ds-core';
import { Meta } from '@storybook/react';
import { SiginInForm } from './components/sign-in-form';
import { SignUpForm } from './components/sign-up-form/SignUpForm';

export default {
  title: 'React-User/Authrization',
} as Meta;

const configs = {
  facebook: {
    appId: '123',
    onSuccess: async () => {},
  },
  google: {
    clientId:
      '994327309880-n0m8sc5b6u788ssfnmjbk8skvjdu9cdr.apps.googleusercontent.com',
    scopes: [],
    onSuccess: async (res) => {
      console.log(res);
    },
  },
  passwordLess: {
    onSubmit: async () => {},
  },
};

export const Default = () => {
  return (
    <Wrapper padding={['s24', 's16']}>
      <SiginInForm configs={configs} />
    </Wrapper>
  );
};

export const SignUp = () => {
  return (
    <Wrapper padding={['s24', 's16']}>
      <SignUpForm configs={configs} />
    </Wrapper>
  );
};

SignUp.storyName = 'Sign Up Form';
Default.storyName = 'Sign In Form';

const Wrapper = styled(Box)`
  background-color: ${({ theme }) => theme.colors?.background};
  border-radius: ${({ theme }) => theme.radius?.r16};
  width: 420px;
  margin: 0 auto;
`;
