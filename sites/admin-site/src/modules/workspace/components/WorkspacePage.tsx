import React from 'react';

export interface WorkSpacePageProps {
  children?: React.ReactNode;
  title?: string;
  breadcrumb?: string[];
}

export const WorkspacePage: React.FC<WorkSpacePageProps> = ({ children }) => {
  return <div>{children}</div>;
};
