'use client';

import { Suspense, useEffect, useState } from 'react';
import { AuthContext } from './auth-context';
import dynamic from 'next/dynamic';

const AuthModal = dynamic(
  () => import('./containers/AuthModal').then((mod) => mod.AuthModal),
  {
    ssr: false,
  },
);

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string>();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setUserId('123');
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ userId: userId, openLoginModal: () => setShowLoginModal(true) }}
    >
      {children}
      <Suspense>
        <AuthModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
        />
      </Suspense>
    </AuthContext.Provider>
  );
};
