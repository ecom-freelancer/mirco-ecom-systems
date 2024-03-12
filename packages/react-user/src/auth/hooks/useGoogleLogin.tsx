import { useEffect, useRef } from 'react';
import { GoogleAuthConfig } from '../components/sign-in-form/GoogleLoginButton';

export type GoogleLoginResponse = {
  access_token: string;
};

export const useGoogleLogin = (config: GoogleAuthConfig) => {
  const { clientId, onSuccess } = config;
  const client = useRef<any>(null);

  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google) return;
      const googleClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope:
          'https://www.googleapis.com/auth/userinfo.email \
          https://www.googleapis.com/auth/userinfo.profile',
        callback: (tokenRes: GoogleLoginResponse) => {
          onSuccess(tokenRes);
        },
      });
      client.current = googleClient;
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = initializeGoogle;
    script.async = true;
    script.defer = true;
    script.id = 'google-client-script';
    document.querySelector('body')?.appendChild(script);

    return () => {
      window.google?.accounts.id.cancel();
      document.getElementById('google-client-script')?.remove();
    };
  }, [clientId, onSuccess]);

  return {
    ref: client,
    onClick: () => {
      client.current?.requestAccessToken();
    },
  };
};
