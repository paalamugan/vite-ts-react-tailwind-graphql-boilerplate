import type { toast } from '@/components/ui/use-toast';

export interface AxiosRequestConfigData {
  raw?: boolean;
  silent?: boolean;
}

export interface IHttpErrorData {
  message: string;
  code?: string;
  description?: string;
}

export interface ErrorHandlerObject {
  after?(error?: IHttpErrorData, options?: ErrorHandlerObject): void;
  before?(error?: IHttpErrorData, options?: ErrorHandlerObject): void;
  message?: string;
  notify?: Parameters<typeof toast>[number];
}

export type ErrorHandlerFunction = (error?: IHttpErrorData) => ErrorHandlerObject | boolean | undefined;

export type ErrorHandler = ErrorHandlerFunction | ErrorHandlerObject | string;

export type ErrorHandlerMany = Record<string, ErrorHandler>;
