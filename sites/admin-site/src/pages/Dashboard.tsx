import { styled } from '@packages/ds-core';
import { FeatureComingSoon } from 'modules/_shared/components';
import { Page } from 'modules/_shared/components/Page';

export const DashboardPage = () => {
  return (
    <StyledPage>
      <FeatureComingSoon />
    </StyledPage>
  );
};

const StyledPage = styled(Page)`
  padding: 0;
  margin: auto;
  display: flex;
`;
