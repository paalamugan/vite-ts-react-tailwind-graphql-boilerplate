import { AxiosClient } from './AxiosClient';
import { HttpClient } from './HttpClient';
import type { IAxiosClientConfig } from './IAxiosClient';

export const axiosDefaultConfig: IAxiosClientConfig = {};
export const httpClient = new HttpClient(new AxiosClient(axiosDefaultConfig));

export * from './HttpError';
export * from './exceptions';
