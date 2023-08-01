export interface AppEnvConfig {
  apiUrl: string;
  apiKey: string;
  clientId: string;
  tenantId: string;
}

export enum DeployedEnvironment {
  DEV = 'DEV',
  QA = 'QA',
  UAT = 'UAT',
  PROD = 'PROD',
}
