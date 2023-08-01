import type { MsalProviderProps } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';

import { InitialLoader } from '../common/InitialLoader/InitialLoader';

import { CustomNavigationClient } from './CustomNavigationClient/CustomNavigationClient';

/**
 *  This component is optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
 */
export const ClientSideNavigation: React.FC<MsalProviderProps> = ({ children, instance }) => {
  const { instance: msalInstance } = useMsal();
  const navigate = useNavigate();
  const navigationClient = new CustomNavigationClient(navigate);
  instance.setNavigationClient(navigationClient);

  // react-router-dom v6 doesn't allow navigation on the first render - delay rendering of MsalProvider to get around this limitation
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const activeAccount = msalInstance.getActiveAccount();
    if (activeAccount) {
      return setFirstRender(false);
    }
    const timer = setTimeout(() => {
      setFirstRender(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [msalInstance]);

  if (firstRender) return <InitialLoader />;

  return (
    <>
      <ScrollRestoration getKey={location => location.pathname} />
      {children}
    </>
  );
};
