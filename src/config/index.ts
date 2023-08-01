import { DeployedEnvironment } from '@/types/config';

import { devEnvConfig } from './dev';
import { prodEnvConfig } from './prod';
import { qaEnvConfig } from './qa';
import { uatEnvConfig } from './uat';

export const appEnvConfig = {
  [DeployedEnvironment.DEV]: devEnvConfig,
  [DeployedEnvironment.QA]: qaEnvConfig,
  [DeployedEnvironment.UAT]: uatEnvConfig,
  [DeployedEnvironment.PROD]: prodEnvConfig,
};
