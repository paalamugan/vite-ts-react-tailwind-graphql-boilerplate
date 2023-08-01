import { useContext } from 'react';

import { AppConfigContext } from './AppConfigProvider';

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);
  if (!context) {
    throw new Error('useAppConfig must be used within a AppConfigProvider');
  }
  return context;
};
