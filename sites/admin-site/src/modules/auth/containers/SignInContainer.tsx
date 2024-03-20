import { styled, Flex, Box, Text, Heading } from '@packages/ds-core';
import { SiginInForm } from '@packages/react-user';
import { Logo } from 'modules/_shared/components/Logo';
import React from 'react';
import { useLogin } from '../hooks/useLogin';

export const SignInContainer: React.FC = () => {
  const { loginWithPassword, loading } = useLogin();

  return (
    <SignInWrapper>
      <Flex align="stretch">
        <LefttSide>
          <Box marginBottom="s16">
            <Logo size="small" />
          </Box>
          <SiginInForm
            loading={loading}
            configs={{
              passwordLess: {
                onSubmit: loginWithPassword,
                usernameType: 'email',
              },
            }}
          />
          <Text fontSize="xs" color="textSecondary">
            Copyright © 2024 Skydash
          </Text>
        </LefttSide>
        <RightSide>
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
            </Flex>
          </Box>
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

const RightSide = styled.div`
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

const LefttSide = styled.div`
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
