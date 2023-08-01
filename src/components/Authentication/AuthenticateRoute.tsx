import type { AccountInfo } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { AuthenticationLoader } from '@/components/Authentication/AuthenticationLoader';
import { useAuth } from '@/providers/AuthProvider';
import { ROUTER_PATH } from '@/routes/path';
import { getMsalUserInfo } from '@/shared/helpers/msal.helper';
import { logger } from '@/shared/utils/logger';

export const RequireAuth = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTER_PATH.SIGN_IN} state={{ from: location }} replace />;
};

export const AuthenticateRoute = () => {
  const { instance: msalInstance } = useMsal();

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const { setAuth } = useAuth();

  const fetchMsalUserInfo = useCallback(
    async (account: AccountInfo | null) => {
      try {
        if (!account) {
          setAuth({ user: null, account: null });
          setIsAuthenticating(false);
          return;
        }
        const user = await getMsalUserInfo(msalInstance, account);

        setAuth({ user, account });
      } catch (err) {
        const error = err as Error;
        logger.error(error.message);
        setAuth({ user: null, account: null });
      } finally {
        setIsAuthenticating(false);
      }
    },
    [setAuth, msalInstance],
  );

  const fetchMsalUserInfoRef = useRef(fetchMsalUserInfo);

  useEffect(() => {
    fetchMsalUserInfoRef.current = fetchMsalUserInfo;
  }, [fetchMsalUserInfo]);

  useEffect(() => {
    const account = msalInstance.getActiveAccount();
    void fetchMsalUserInfoRef.current(account);
  }, [msalInstance]);

  if (isAuthenticating) return <AuthenticationLoader />;
  return <RequireAuth />;
};
