import React from 'react';
import { AuthContext } from '../provider/auth-context';

export const useAuthContext = () => React.useContext(AuthContext);
