import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { AxiosReturnResponse } from '@/types/axios';
import type { AxiosRequestConfigData } from '@/types/http-error';

import { responseErrorHandler, responseSuccessHandler } from './handlers';
import type { IAxiosClient, IAxiosClientConfig } from './IAxiosClient';

export class AxiosClient implements IAxiosClient<IAxiosClientConfig> {
  public config: IAxiosClientConfig;
  private axiosInstance: ReturnType<(typeof axios)['create']>;

  constructor(config: IAxiosClientConfig) {
    this.config = config;
    this.axiosInstance = axios.create(config);
    this.axiosInstance.interceptors.response.use(responseSuccessHandler, responseErrorHandler);
  }

  get<TData = unknown, TConfig extends IAxiosClientConfig = IAxiosClientConfig>(url: string, config?: TConfig) {
    return this.axiosInstance.get(url, config) as AxiosReturnResponse<TData, TConfig>;
  }

  post<TData = unknown, TBody = unknown, TConfig extends IAxiosClientConfig = IAxiosClientConfig>(
    url: string,
    body: TBody,
    config?: TConfig,
  ) {
    return this.axiosInstance.post<TData>(url, body, config) as AxiosReturnResponse<TData, TConfig>;
  }

  put<TData = unknown, TBody = unknown, TConfig extends IAxiosClientConfig = IAxiosClientConfig>(
    url: string,
    body?: TBody,
    config?: TConfig,
  ) {
    return this.axiosInstance.put<TData, AxiosResponse<TData, AxiosRequestConfigData>>(
      url,
      body,
      config,
    ) as AxiosReturnResponse<TData, TConfig>;
  }

  patch<TData = unknown, TBody = unknown, TConfig extends IAxiosClientConfig = IAxiosClientConfig>(
    url: string,
    body?: TBody,
    config?: TConfig,
  ) {
    return this.axiosInstance.patch<TData>(url, body, config) as AxiosReturnResponse<TData, TConfig>;
  }

  delete<TData = unknown, TConfig extends IAxiosClientConfig = IAxiosClientConfig>(url: string, config?: TConfig) {
    return this.axiosInstance.delete<TData>(url, config) as AxiosReturnResponse<TData, TConfig>;
  }
}
