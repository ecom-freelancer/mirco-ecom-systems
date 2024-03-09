import React from 'react';

export interface IWorkSpaceContext {
  collapsed: boolean;

  toggleCollapsed: () => void;

  setCollapsed: (collapsed: boolean) => void;
}

export const WorkSpaceContext = React.createContext<IWorkSpaceContext>({
  collapsed: false,
  toggleCollapsed: () => {},
  setCollapsed: () => {},
});

export const useWorkSpaceContext = () => React.useContext(WorkSpaceContext);
