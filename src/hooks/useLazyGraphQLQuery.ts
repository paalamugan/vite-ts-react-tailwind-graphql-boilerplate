import { useCallback } from 'react';

import type { TypedDocumentString } from '@/gql/graphql';
import { useAppConfig } from '@/providers/AppConfigProvider';
import { graphQLFetcher } from '@/shared/helpers/graphql-query.helper';

import { useLazyQueryFetcher } from './useLazyQueryFetcher';

/**
 * The `useLazyGraphQLQuery` function is a TypeScript hook that allows for lazy loading of GraphQL
 * queries.
 * @param document - The `document` parameter is a GraphQL document that represents the query you want
 * to execute. It is of type `TypedDocumentString<TResult, TVariables>`.
 * @returns The function `useLazyGraphQLQuery` returns the result of calling the `useLazyQueryFetcher`
 * function with the `lazyFetcher` function as an argument.
 * Example:
 * ```
 * const { fetcher, data, error, loading } = useLazyGraphQLQuery(orderLookup);
 * useEffect(() => {
 * const fetchOrderLookup = async () => {
 *  try {
 *     await fetcher({ orderNumber: '123' });
 *   } catch (err) {
 *     // Handle error
 *   }
 * };
 * fetchOrderLookup();
 * }, [fetcher]);
 * ```
 */
export const useLazyGraphQLQuery = <TResult, TVariables>(document: TypedDocumentString<TResult, TVariables>) => {
  const config = useAppConfig();
  const fetcher = graphQLFetcher<Omit<TResult, '__typename'>, TVariables>(config.apiUrl, config.apiKey);
  const lazyFetcher = useCallback(
    (variables: TVariables) => {
      return fetcher({ query: document.length ? document.toString() : '', variables: variables });
    },
    [document, fetcher],
  );
  return useLazyQueryFetcher(lazyFetcher);
};
