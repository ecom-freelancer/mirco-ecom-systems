import { styled } from '@packages/ds-core';
import { SignInContainer } from 'modules/auth';

export const SignInPage: React.FC = () => {
  return (
    <LoginPageWrapper>
      <Center>
        <SignInContainer />
      </Center>
    </LoginPageWrapper>
  );
};

const LoginPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('./login-background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  padding: 1rem;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
