'use client';

import { Suspense, useState } from 'react';
import { AuthContext } from './auth-context';
import dynamic from 'next/dynamic';
import { useUserInfo } from './hooks/useUserInfo';

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
  const [{ user, isLoading }, { mutate, setLoginResponse, logout }] =
    useUserInfo();

  const [showLoginModal, setShowLoginModal] = useState<{
    mode?: 'login' | 'register' | 'forgot-password';
    show: boolean;
  }>({
    show: false,
  });

  return (
    <AuthContext.Provider
      value={{
        logout,
        loading: isLoading,
        setLoginResponse: setLoginResponse,
        refresh: () => mutate(),
        user: user,
        openLoginModal: (mode) =>
          setShowLoginModal({
            mode: mode,
            show: true,
          }),
      }}
    >
      {children}
      <Suspense>
        <AuthModal
          showLoginModal={showLoginModal.show}
          mode={showLoginModal.mode}
          setShowLoginModal={(show) =>
            setShowLoginModal({ ...showLoginModal, show: show })
          }
        />
      </Suspense>
    </AuthContext.Provider>
  );
};
