import type { Configuration, RedirectRequest } from '@azure/msal-browser';
import { LogLevel } from '@azure/msal-browser';

import { logger } from '@/shared/utils/logger';
// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const msedge = ua.indexOf('Edge/');
const firefox = ua.indexOf('Firefox');
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

// Config object to be passed to Msal on creation
export const getMsalConfig = ({ clientId, tenantId }: { clientId: string; tenantId: string }) => {
  const authority = `https://login.microsoftonline.com/${tenantId}`;

  const msalConfig: Configuration = {
    auth: {
      authority: authority,
      clientId: clientId,
      postLogoutRedirectUri: '/logout',
      redirectUri: '/redirect',
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE || isEdge || isFirefox,
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        logLevel: LogLevel.Error, // Only show error logs in the console
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              logger.error(message);
              return;
            case LogLevel.Info:
              logger.info(message);
              return;
            case LogLevel.Verbose:
              logger.debug(message);
              return;
            case LogLevel.Warning:
              logger.warn(message);
              return;
            default:
              return;
          }
        },
      },
    },
  };

  return msalConfig;
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
  scopes: ['User.Read.All', 'profile'],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
