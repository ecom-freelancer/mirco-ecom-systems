import { Outlet } from 'react-router';
import { WorkspaceLayout } from '.';

export const WorkspaceProvider: React.FC = () => {
  return (
    <WorkspaceLayout>
      <Outlet />
    </WorkspaceLayout>
  );
};
