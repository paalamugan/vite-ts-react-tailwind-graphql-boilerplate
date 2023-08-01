import axios from 'axios';
import { isFunction, isObject, isString } from 'lodash-es';

import { toast } from '@/components/ui/use-toast';
import { jsonParser } from '@/lib/utils';
import type {
  AxiosRequestConfigData,
  ErrorHandler,
  ErrorHandlerMany,
  ErrorHandlerObject,
  IHttpErrorData,
} from '@/types/http-error';

export const isErrorHandlerObject = (value: unknown): value is ErrorHandlerObject => {
  if (!isObject(value)) return false;
  return ['message', 'after', 'before', 'notify'].some(k => k in value);
};

export class ErrorHandlerRegistry {
  private handlers = new Map<string, ErrorHandler>();

  private parent: ErrorHandlerRegistry | null = null;

  constructor(parent?: ErrorHandlerRegistry, input?: ErrorHandlerMany) {
    if (parent) this.parent = parent;
    if (input) this.registerMany(input);
  }

  register(key: string, handler: ErrorHandler) {
    this.handlers.set(key, handler);
    return this;
  }

  unregister(key: string) {
    this.handlers.delete(key);
    return this;
  }

  find(seek: string): ErrorHandler | undefined {
    const handler = this.handlers.get(seek);
    if (handler) return handler;
    return this.parent?.find(seek);
  }

  registerMany(input: ErrorHandlerMany) {
    for (const [key, value] of Object.entries(input)) {
      this.register(key, value);
    }
    return this;
  }

  handleError(this: ErrorHandlerRegistry, seek: (string | undefined)[] | string, error: IHttpErrorData): boolean {
    if (Array.isArray(seek)) {
      return seek.some(key => {
        if (key) return this.handleError(`${key}`, error);
      });
    }
    const handler = this.handlers.get(`${seek}`);
    if (!handler) {
      return false;
    } else if (isString(handler)) {
      return this.handleErrorObject(error, { message: handler });
    } else if (isFunction(handler)) {
      const result = handler(error);
      if (isErrorHandlerObject(result)) return this.handleErrorObject(error, result);
      return !!result;
    } else if (isErrorHandlerObject(handler)) {
      return this.handleErrorObject(error, handler);
    }
    return false;
  }

  handleErrorObject(error?: IHttpErrorData, options: ErrorHandlerObject = {}) {
    options?.before?.(error, options);
    toast({
      title: options?.message ?? 'Unknown error occurred! Please try again later.',
      variant: 'destructive',
      ...options?.notify,
    });
    return true;
  }

  responseErrorHandler(this: ErrorHandlerRegistry, error: unknown, direct?: boolean) {
    if (axios.isAxiosError<IHttpErrorData, AxiosRequestConfigData>(error)) {
      const response = error?.response;

      const config = error?.config;
      const configData = jsonParser<AxiosRequestConfigData>(config?.data);
      const errorData = response?.data;
      if (!direct && configData?.raw) throw error;
      const seekers = [errorData?.code, error.code, error?.name, `${response?.status}`];

      const result = this.handleError(seekers, error);

      if (!result) {
        if (errorData?.message) {
          this.handleErrorObject(error, {
            message: errorData?.message,
          });
        } else {
          this.handleErrorObject(error, {
            message: error.message,
          });
        }
      }
    } else if (error instanceof Error) {
      return this.handleError(error.name, error);
    } else {
      //if nothings works, throw away
      throw new Error('Unknown error occurred! Please try again later.');
    }
  }
}
