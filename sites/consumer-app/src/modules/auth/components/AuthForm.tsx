'use client';

import { Logo } from '@/modules/layout/components/header/Logo';
import { Box, Flex, Heading, styled, Text } from '@packages/ds-core';
import React, { useState } from 'react';
import { SiginInForm, SignUpForm } from '@packages/react-user';
import { Button } from 'antd';

export interface AuthFormProps {}

export const AuthForm: React.FC<AuthFormProps> = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(
    'login',
  );
  return (
    <SignInWrapper>
      <Flex align="stretch">
        <LeftSide>
          <Box padding={[0, 's48']}>
            <Flex align="center" direction="column" justify="center" gap="s16">
              <Heading type="h3">Hello, Friend</Heading>
              <Line marginBottom="s16" />
              <div>
                <Text
                  fontSize="s"
                  style={{
                    color: '#ffffffd5',
                  }}
                >
                  Fill up personal infomation and start journey with us.
                </Text>
              </div>
              <Box marginTop="s16">
                {mode == 'login' && (
                  <SignButton type="text" onClick={() => setMode('register')}>
                    Create an account
                  </SignButton>
                )}

                {mode == 'register' && (
                  <SignButton type="text" onClick={() => setMode('login')}>
                    Sign In
                  </SignButton>
                )}
              </Box>
            </Flex>
          </Box>
        </LeftSide>
        <RightSide>
          <Logo />

          {mode == 'login' && (
            <SiginInForm
              configs={{
                passwordLess: {
                  onForgotPassword: () => setMode('forgot-password'),
                },
                facebook: {
                  appId: '1234567890',
                  onSuccess: async () => {},
                },
                google: {
                  clientId: '1234567890',
                  scopes: [],
                  onSuccess: async () => {},
                },
              }}
            />
          )}
          {mode == 'register' && (
            <Box padding={['s2', 's16', 's16', 's16']}>
              <SignUpForm
                configs={{
                  facebook: {
                    appId: '1234567890',
                    onSuccess: async () => {},
                  },
                  google: {
                    clientId: '1234567890',
                    scopes: [],
                    onSuccess: async () => {},
                  },
                }}
              />
            </Box>
          )}
        </RightSide>
      </Flex>
    </SignInWrapper>
  );
};

const SignInWrapper = styled.div`
  background-color: white;
  border-radius: 1rem;
  -webkit-box-shadow: 0px 1px 20px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 1px 20px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 20px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SignButton = styled(Button)`
  color: white;
  border-color: white;
  border-radius: 1rem;
  :hover,
  :active {
    color: white !important;
  }
`;

const LeftSide = styled.div`
  display: flex;
  width: 320px;
  background: url('./right_login_background.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  color: white;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 0;
  }
`;

const RightSide = styled.div`
  width: 450px;
  padding: ${({ theme }) => theme.spaces.s16};
  padding-bottom: 0.75rem;
`;

const Line = styled(Box)`
  background-color: white;
  height: 2px;
  width: 50px;
  margin: auto;
`;
