import React, { ReactNode } from 'react';
import { IFileService, fileService } from '../services/upload.service';

export interface ServiceProviderContext {
  fileService: IFileService;
}

export const ServiceContext = React.createContext<ServiceProviderContext>({
  fileService: fileService,
});

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ServiceContext.Provider value={{ fileService }}>
      {children}
    </ServiceContext.Provider>
  );
};
