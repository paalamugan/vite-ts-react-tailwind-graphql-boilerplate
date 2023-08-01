import type { AxiosResponse } from 'axios';

import type { IAxiosClientConfig } from '@/shared/utils/http/IAxiosClient';

export type AxiosReturnResponse<TData = unknown, TConfig = IAxiosClientConfig> = TConfig extends {
  data: { raw: boolean };
}
  ? Promise<AxiosResponse<TData, unknown>>
  : Promise<TData>;
