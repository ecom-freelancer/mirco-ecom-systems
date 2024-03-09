import { Outlet } from 'react-router';
import { WorkspaceLayout } from '.';
import { useState } from 'react';
import { WorkSpaceContext } from './context';

export const WorkspaceProvider: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <WorkSpaceContext.Provider
      value={{
        collapsed,
        toggleCollapsed: () => setCollapsed((v) => !v),
        setCollapsed,
      }}
    >
      <WorkspaceLayout>
        <Outlet />
      </WorkspaceLayout>
    </WorkSpaceContext.Provider>
  );
};
