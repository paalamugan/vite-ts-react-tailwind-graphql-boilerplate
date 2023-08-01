import type { AuthenticationResult, EventMessage } from '@azure/msal-browser';
import { EventType } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { ClientSideNavigation } from '@/components/ClientSideNavigation/ClientSideNavigation';

export const RootLayout = () => {
  const { instance: msalInstance } = useMsal();
  const location = useLocation();

  const setAzureADAccount = useCallback(() => {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    const accounts = msalInstance.getAllAccounts();
    const currentActiveAccount = msalInstance.getActiveAccount();

    // Default to using the first account if no account is active on page load
    if (!currentActiveAccount && accounts.length && accounts[0]) {
      // Account selection logic is app dependent. Adjust as needed for different use cases.
      msalInstance.setActiveAccount(accounts[0]);
    }
  }, [msalInstance]);

  useEffect(() => {
    setAzureADAccount();
    // Optional - This will update account state if a user signs in from another tab or window
    msalInstance.enableAccountStorageEvents();

    const eventId = msalInstance.addEventCallback((event: EventMessage) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        const payload = event.payload as AuthenticationResult | null;
        if (payload) {
          msalInstance.setActiveAccount(payload.account);
        }
      }

      if (event.eventType === EventType.HANDLE_REDIRECT_END) {
        setAzureADAccount();
      }
    });

    return () => {
      if (eventId) {
        msalInstance.removeEventCallback(eventId);
      }
    };
  }, [location.pathname, msalInstance, setAzureADAccount]);

  return (
    <ClientSideNavigation instance={msalInstance}>
      <Outlet />
    </ClientSideNavigation>
  );
};
