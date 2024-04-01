import { useContext } from 'react';
import { ServiceContext } from '../providers/ServiceProvider';

export const useServices = () => useContext(ServiceContext);
