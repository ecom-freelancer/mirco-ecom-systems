'use client';

import { createContext, useEffect, useState } from 'react';

export interface AuthContextType {
  userId?: string;
}

export const AuthContext = createContext<AuthContextType>({});

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setUserId('123');
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userId: userId }}>
      {children}
    </AuthContext.Provider>
  );
};
