import { FaGooglePlusG } from 'react-icons/fa';
import { IconLogin } from './IconLogin';
import React from 'react';
import {
  GoogleLoginResponse,
  useGoogleLogin,
} from '../../hooks/useGoogleLogin';

export interface GoogleAuthConfig {
  clientId: string;
  scopes: string[];
  onSuccess?: (response: GoogleLoginResponse) => Promise<void>;
}
export interface GoogleLoginButtonProps {
  config: GoogleAuthConfig;
}

export const GoogleLoginButtonIcon: React.FC<GoogleLoginButtonProps> = ({
  config,
}) => {
  const { onClick } = useGoogleLogin(config);
  return (
    <IconLogin title="Login By Google" onClick={onClick}>
      <FaGooglePlusG />
    </IconLogin>
  );
};
