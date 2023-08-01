import { PublicClientApplication, type AccountInfo, type IPublicClientApplication } from '@azure/msal-browser';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { getMsalConfig, graphConfig, loginRequest } from '@/components/Authentication/msalAuthConfig';
import type { UserInfo } from '@/types/common';

export const getMsalUserInfo = async (msalInstance: IPublicClientApplication, account: AccountInfo | null) => {
  if (!account) {
    throw Error('No active account! Verify a user has been signed in and setActiveAccount has been called.');
  }

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account,
  });

  const bearer = `Bearer ${response.accessToken}`;

  const options: AxiosRequestConfig = {
    headers: {
      Authorization: bearer,
    },
  };

  const url = `${graphConfig.graphMeEndpoint}?$select=id,displayName,givenName,surname,mail,mobilePhone,employeeId`;

  const res = await axios.get<UserInfo>(url, options);
  return res.data;
};

export const getMsalPublicClientApplication = (clientId: string, tenantId: string): IPublicClientApplication => {
  if (!clientId || !tenantId) {
    throw new Error('Client ID or Tenant ID not defined.');
  }

  const msalConfig = getMsalConfig({ clientId, tenantId });
  return new PublicClientApplication(msalConfig);
};
