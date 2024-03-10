import { styled } from '@packages/ds-core';
import { t } from 'i18next';

export const DashboardPage = () => {
  return (
    <div>
      <Box />
      {t('dashboard')}
    </div>
  );
};

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors?.primary || 'red'};
`;
