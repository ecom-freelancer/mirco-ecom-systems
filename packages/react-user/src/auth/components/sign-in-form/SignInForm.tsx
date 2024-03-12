import React from 'react';
import {
  FacebookAuthConfig,
  FacebookLoginButtonIcon,
} from './FacebookLoginButton';
import {
  LoginByPasswordForm,
  PasswordLessAuthConfig,
} from './LoginByPasswordForm';
import { Box, Flex, Heading, Text, styled } from '@packages/ds-core';
import { GoogleAuthConfig, GoogleLoginButtonIcon } from './GoogleLoginButton';

export interface SiginFormProps {
  configs: {
    facebook?: FacebookAuthConfig;
    google?: GoogleAuthConfig;
    passwordLess?: PasswordLessAuthConfig;
  };
}

export const SiginInForm: React.FC<SiginFormProps> = ({ configs }) => {
  return (
    <Flex direction="column" align="center">
      <Box marginBottom="s16">
        <Flex justify="center" direction="column" align="center">
          <Heading type="h2" color="primary">
            Sign in to Account
          </Heading>
          <Line />
        </Flex>
      </Box>

      {/* socical login row */}
      <Box>
        <Flex justify="center" gapX="s16">
          {configs.facebook && (
            <FacebookLoginButtonIcon config={configs.facebook} />
          )}

          {configs.google && <GoogleLoginButtonIcon config={configs.google} />}
        </Flex>

        <Box marginTop="s16" marginBottom="s10">
          <Text fontSize="s" color="textSecondary">
            or use your email account
          </Text>
        </Box>
      </Box>
      <Box style={{ minWidth: 300 }}>
        <LoginByPasswordForm config={configs.passwordLess} />
      </Box>
    </Flex>
  );
};

SiginInForm.displayName = 'SiginInForm';

const Line = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 0.2rem;
  width: 3.5rem;
`;
