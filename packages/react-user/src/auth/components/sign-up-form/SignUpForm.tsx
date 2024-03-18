import React from 'react';
import {
  FacebookAuthConfig,
  FacebookLoginButtonIcon,
} from '../sign-in-form/FacebookLoginButton';
import {
  GoogleAuthConfig,
  GoogleLoginButtonIcon,
} from '../sign-in-form/GoogleLoginButton';
import { Box, Heading, Flex, Text, styled } from '@packages/ds-core';
import { CreateAccountForm } from './CreateAccountForm';

export interface SignUpFormProps {
  configs: {
    facebook?: FacebookAuthConfig;
    google?: GoogleAuthConfig;
  };
}
export const SignUpForm: React.FC<SignUpFormProps> = ({ configs }) => {
  return (
    <Flex direction="column" align="center">
      <Box marginBottom="s16">
        <Flex justify="center" direction="column" align="center">
          <Heading type="h3" color="primary">
            Create an Account
          </Heading>
        </Flex>
        <Flex justify="center">
          <Line />
        </Flex>
      </Box>
      <Box marginBottom="s16">
        <Flex justify="center" gapX="s16">
          {configs.facebook && (
            <FacebookLoginButtonIcon config={configs.facebook} />
          )}

          {configs.google && <GoogleLoginButtonIcon config={configs.google} />}
        </Flex>

        <Box marginTop="s8">
          <Text fontSize="s" color="textSecondary">
            or create an account with your email
          </Text>
        </Box>
      </Box>
      <Box style={{ minWidth: 300 }}>
        <CreateAccountForm />
      </Box>
    </Flex>
  );
};

const Line = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 0.2rem;
  width: 3.5rem;
`;
