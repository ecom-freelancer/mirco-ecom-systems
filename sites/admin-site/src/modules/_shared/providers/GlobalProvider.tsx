import { notification } from 'antd';
import { NotificationInstance } from 'antd/es/notification/interface';
import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export interface IGlobalContext {
  noti: NotificationInstance;
}

export const GlobalContext = React.createContext<IGlobalContext>({
  noti: {} as NotificationInstance,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => React.useContext(GlobalContext);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification({
    placement: 'top',
  });

  return (
    <GlobalContext.Provider value={{ noti: api }}>
      {contextHolder}
      {children}
      <Toaster />
    </GlobalContext.Provider>
  );
};
