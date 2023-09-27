import { PublicClientApplication, type AccountInfo, type IPublicClientApplication } from '@azure/msal-browser';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { getMsalConfig, graphConfig, loginRequest } from '@/components/Authentication/msalAuthConfig';
import type { UserInfo } from '@/types/common';

const getAzureAuthenticationResult = async (msalInstance: IPublicClientApplication, account: AccountInfo | null) => {
  if (!account) {
    throw Error('No active account! Verify a user has been signed in and setActiveAccount has been called.');
  }

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account,
  });
  const idTokenClaims = response.idTokenClaims as { exp: number };
  const expireDate = new Date(idTokenClaims.exp * 1000);
  const now = new Date();

  if (now > expireDate) {
    // If idToken is expired, we get a new one
    return msalInstance.ssoSilent({
      ...loginRequest,
    });
  }

  return response;
};

const getAvatarUrl = async (accessToken: string) => {
  const bearer = `Bearer ${accessToken}`;

  const options: AxiosRequestConfig = {
    headers: {
      Authorization: bearer,
    },
  };

  const avatarResponse = await axios.get<Blob>(`${graphConfig.graphMeEndpoint}/photo/$value`, {
    ...options,
    responseType: 'blob',
  });
  let avatar = '';
  if (avatarResponse.data) {
    avatar = URL.createObjectURL(avatarResponse.data);
  }
  return avatar;
};

export const getMsalUserInfo = async (msalInstance: IPublicClientApplication, account: AccountInfo | null) => {
  try {
    const response = await getAzureAuthenticationResult(msalInstance, account);
  
    const bearer = `Bearer ${response.accessToken}`;
  
    const options: AxiosRequestConfig = {
      headers: {
        Authorization: bearer,
      },
    };
  
    const url = `${graphConfig.graphMeEndpoint}?$select=id,displayName,givenName,surname,mail,mobilePhone,employeeId`;
  
    const res = await axios.get<UserInfo>(url, options);
    const avatar = await getAvatarUrl(response.accessToken);
    return { ...res.data, avatar };
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      await msalInstance.acquireTokenRedirect({
        ...loginRequest,
        account: account || undefined,
      });
      return null;
    }
    throw error;
  }
};

export const getMsalPublicClientApplication = (clientId: string, tenantId: string): IPublicClientApplication => {
  if (!clientId || !tenantId) {
    throw new Error('Client ID or Tenant ID not defined.');
  }

  const msalConfig = getMsalConfig({ clientId, tenantId });
  return new PublicClientApplication(msalConfig);
};
