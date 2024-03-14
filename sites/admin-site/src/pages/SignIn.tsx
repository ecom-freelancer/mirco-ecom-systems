import { styled } from '@packages/ds-core';
import { routeKeys } from 'configs/constants';
import { SignInContainer } from 'modules/auth';
import { useAuthContext } from 'modules/auth/hooks';
import { Navigate } from 'react-router';

export const SignInPage: React.FC = () => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to={routeKeys.home} />;
  }

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
