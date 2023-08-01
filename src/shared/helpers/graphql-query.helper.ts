import type { ExecutionResult } from 'graphql';

import { toast } from '@/components/ui/use-toast';

import { httpClient, HttpError } from '../utils/http';
import { logger } from '../utils/logger';

export type RemoveErrorType<T, ErrorType> = T extends { __typename: infer U }
  ? U extends ErrorType
    ? never
    : T
  : never;

export type RemoveErrorTypeFromObject<T> = {
  [K in keyof T]: T[K] extends object
    ? RemoveErrorTypeFromObject<T[K]>[keyof RemoveErrorTypeFromObject<T[K]>]
    : RemoveErrorType<T, 'BadRequestError' | 'GenericError' | 'NotFoundError'>;
};

export const validateGraphqlResult = <TResult extends Record<PropertyKey, { __typename: string; message: string }>>(
  result: TResult,
) => {
  for (const data of Object.values(result)) {
    // Just for One Level Error Handling. Need to be updated for handling nested errors if needed in the future.
    if (data.__typename.endsWith('Error')) {
      throw new HttpError(data.message, { name: data.__typename });
    }
  }
  return result as unknown as RemoveErrorTypeFromObject<TResult>;
};

export const graphQLFetcher = <TResult, TVariables>(apiUrl: string, apiKey: string) => {
  return async ({ query, variables }: { query: string; variables: TVariables | undefined }) => {
    try {
      const result = await httpClient.post<ExecutionResult<TResult>>(
        apiUrl,
        {
          query: query,
          variables: variables,
        },
        {
          headers: {
            'X-Api-Key': apiKey,
          },
        },
      );
      const errors = result.errors;
      const data = result.data;

      if (errors) {
        throw new HttpError(errors[0]?.message);
      }

      if (!data) {
        throw new HttpError('Data was not returned from the server.');
      }

      return validateGraphqlResult(data);
    } catch (err) {
      const error = err as Error;
      logger.error(error.message);
      toast({
        title: error.name ? `Error - ${error.name}` : 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };
};
