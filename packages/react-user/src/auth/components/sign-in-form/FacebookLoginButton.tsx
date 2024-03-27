import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { IconLogin } from './IconLogin';
import { useLoginFacebook } from '../../hooks/useFacebookLogin';

export interface FacebookAuthConfig {
  appId: string;
  onSuccess?: (response: fb.AuthResponse) => Promise<void>;
  language?: string;
  scope?: string;
  version?: string;
}

export interface FacebookLoginButtonProps {
  config: FacebookAuthConfig;
}

export const FacebookLoginButtonIcon: React.FC<FacebookLoginButtonProps> = ({
  config,
}) => {
  const { onClick } = useLoginFacebook(config);
  return (
    <IconLogin title="Login By Facebook" onClick={onClick}>
      <FaFacebookF />
    </IconLogin>
  );
};
