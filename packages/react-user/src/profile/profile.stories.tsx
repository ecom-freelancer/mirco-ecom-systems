/** story of Login Form */
import React from 'react';
import { Box, styled } from '@packages/ds-core';
import { Meta } from '@storybook/react';
import { IProfile, ProfileForm } from './components/ProfileForm';

export default {
  title: 'React-User/Profile',
} as Meta;

const profile: IProfile = {
  firstName: 'John',
  lastName: 'Doe',
  dob: '2000-06-20',
  email: 'john123@gmail.com',
  phonenumber: '0819200620',
};

export const Default = () => {
  return (
    <Wrapper padding={['s24', 's16']}>
      <ProfileForm profile={profile} />
    </Wrapper>
  );
};

Default.storyName = 'Update Profile Form';

const Wrapper = styled(Box)`
  background-color: ${({ theme }) => theme.colors?.background};
  border-radius: ${({ theme }) => theme.radius?.r16};
  width: 420px;
  margin: 0 auto;
`;
