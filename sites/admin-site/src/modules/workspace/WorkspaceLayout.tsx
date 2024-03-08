import React from 'react';
import { MenuSidebar } from './components/MenuSidebar';
import { Topbar } from './components/Topbar';

export interface WorkspaceLayoutProps {
  children: React.ReactNode;
}
export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  children,
}) => {
  return (
    <React.Fragment>
      <MenuSidebar />
      <Topbar />
      {children}
    </React.Fragment>
  );
};
