import { type IPublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import type { FC } from 'react';
import { createContext, useEffect, useRef, useState } from 'react';

import { InitialLoader } from '@/components/common/InitialLoader/InitialLoader';
import { InternalErrorResult } from '@/components/ErrorBoundary/InternalErrorResult';
import { appEnvConfig as originalAppEnvConfig } from '@/config';
import { getMsalPublicClientApplication } from '@/shared/helpers/msal.helper';
import type { AppEnvConfig, DeployedEnvironment } from '@/types/config';

type AppConfigContextType = AppEnvConfig;
export const AppConfigContext = createContext<AppConfigContextType | undefined>(undefined);

interface AppConfigProviderProps {
  children: React.ReactNode;
}

export const AppConfigProvider: FC<AppConfigProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [appEnvConfig, setAppEnvConfig] = useState<AppEnvConfig>();
  const msalInstance = useRef<IPublicClientApplication>();

  useEffect(() => {
    const fetchProjectInfo = () => {
      try {
        const deployedEnvironment = process.env.DEPLOYED_ENVIRONMENT as DeployedEnvironment;
        const envConfig = originalAppEnvConfig[deployedEnvironment];
        if (!envConfig) throw new Error(`App config not found for environment: ${deployedEnvironment}`);

        setAppEnvConfig(envConfig);

        msalInstance.current = getMsalPublicClientApplication(envConfig.clientId, envConfig.tenantId);
      } catch (err) {
        const error = err as Error;
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjectInfo();
  }, []);

  if (isLoading) return <InitialLoader />;

  if (error ?? !msalInstance.current) {
    return (
      <InternalErrorResult>
        <div className="text-red-500">
          <strong>Error Message:</strong> {error ?? 'Error loading application.'}
        </div>
      </InternalErrorResult>
    );
  }

  if (!appEnvConfig) return null;

  return (
    <AppConfigContext.Provider value={appEnvConfig}>
      <MsalProvider instance={msalInstance.current}>{children}</MsalProvider>
    </AppConfigContext.Provider>
  );
};
