import { useEffect } from 'react';
import { FacebookAuthConfig } from '../components/sign-in-form/FacebookLoginButton';

export const useLoginFacebook = (config: FacebookAuthConfig) => {
  const { appId, onSuccess, language } = config;

  const handleClick = (): void => {
    // @ts-ignore
    // hasRun exists but type package has not defined it
    if (!window.fbAsyncInit?.hasRun) {
      // in the past, there has been case when Pushdy
      // embeds another instance of FB sdk, which caused fbAsyncInit not called
      // on our FB instance.
      // check if fbAsyncInit has been called
      window.fbAsyncInit?.();
    }

    FB.getLoginStatus((response) => {
      if (response.status !== 'connected') {
        FB.login((loginResponse) => {
          onSuccess(loginResponse.authResponse);
        });
      } else {
        onSuccess(response.authResponse);
      }
    });
  };

  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: appId,
        cookie: true,
        xfbml: false,
        version: 'v15.0',
      });
    };

    (function (d, s, id) {
      if (d.getElementById(id)) {
        return;
      }
      const fjs = d.getElementsByTagName(s)[0] as HTMLScriptElement;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.async = true;
      js.src = `https://connect.facebook.net/${language || 'en_US'}/sdk.js`;
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, [appId, language]);

  return {
    onClick: handleClick,
  };
};
