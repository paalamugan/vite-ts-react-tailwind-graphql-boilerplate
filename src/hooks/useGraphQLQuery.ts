import type { TypedDocumentString } from '@/gql/graphql';
import { useAppConfig } from '@/providers/AppConfigProvider';
import { graphQLFetcher } from '@/shared/helpers/graphql-query.helper';

import { useQueryFetcher } from './useQueryFetcher';

/**
 * The `useGraphQLQuery` function is a TypeScript function that provides a convenient way to use
 * GraphQL queries in a React component.
 * @param document - The `document` parameter is a typed GraphQL document string. It represents the
 * GraphQL query or mutation that you want to execute.
 * @param  - - `TResult`: The type of the result data returned by the GraphQL query.
 * @returns The function `useGraphQLQuery` returns the result of calling the `useQueryFetcher` hook
 * with a fetcher and an options object.
 * Example:
 * ```
 * const { data, error, loading } = useGraphQLQuery(orderLookup, {
 *  orderNumber: '123',
 * });
 * ```
 */
export const useGraphQLQuery = <TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables & { skip?: boolean }]
) => {
  const config = useAppConfig();
  const { skip, ...restVariables } = variables ?? {};
  const fetcher = graphQLFetcher<Omit<TResult, '__typename'>, typeof restVariables>(config.apiUrl, config.apiKey);
  return useQueryFetcher(fetcher, {
    query: document.length ? document.toString() : '',
    skip: skip,
    variables: restVariables,
  });
};
