import React from 'react';
import { Layout } from 'antd';
import { styled } from '@packages/ds-core';
import { Topbar } from './components/topbar/Topbar';
import { MenuSidebar } from './components/MenuSidebar';

export interface WorkspaceLayoutProps {
  children: React.ReactNode;
}
export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  children,
}) => {
  return (
    <React.Fragment>
      <StyledWorkspaceLayout>
        <Topbar />
        <Layout hasSider>
          <MenuSidebar />
          <MainContent>{children}</MainContent>
        </Layout>
      </StyledWorkspaceLayout>
    </React.Fragment>
  );
};

const StyledWorkspaceLayout = styled(Layout)`
  height: 100vh;
`;

const MainContent = styled(Layout.Content)`
  background-color: #f5f7ff;
  overflow: auto;
  position: relative;
`;
