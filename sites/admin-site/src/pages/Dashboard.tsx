import { styled } from '@packages/ds-core';
import { t } from 'i18next';
import { SignInContainer } from 'modules/auth';

export const DashboardPage = () => {
  return (
    <div>
      <Box />
      <SignInContainer />
      {t('dashboard')}
    </div>
  );
};

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors?.primary || 'red'};
`;
