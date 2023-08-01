import { useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';

import { QueryFetchErrorContent } from './QueryFetchErrorContent';

type DataLoadingContent<TLoadingContent, TData> = TLoadingContent extends undefined ? TData : NonNullable<TData>;

export interface QueryFetchTemplateProps<TData, TLoadingContent> {
  loading: boolean;
  error?: Error | null;
  data: TData;
  children: (props: { isLoading: boolean; data: DataLoadingContent<TLoadingContent, TData> }) => React.ReactNode;
  loadingContent?: TLoadingContent;
  noDataContent?: React.ReactNode;
  showErrorToast?: boolean;
  renderErrorContent?: (error: Error) => React.ReactNode;
}

/**  
  @description This component is used to handle render the loading, error and no data states for a query fetcher.

  @param loading {boolean} - The loading state of the query fetcher.
  @param error {Error | null} - The error state of the query fetcher.
  @param data {TData} - The data state of the query fetcher.
  @param children {(props: { isLoading: boolean; data: DataLoadingContent<TLoadingContent, TData> }) => React.ReactNode} - The render prop to render the data state.
  
  @param loadingContent {React.ReactNode} (optional) - The loading content to render when the query fetcher is loading.
  @default loadingContent undefined
  
  @param noDataContent {React.ReactNode} (optional) - The no data content to render when the query fetcher has no data.
  @default noDataContent undefined

  @param showErrorToast {boolean} (optional) - Whether to show the error toast when the query fetcher has an error.
  @default showErrorToast true

  @param renderErrorContent {(error: Error) => React.ReactNode}(optional) - The render prop to render the error state.
  @default renderErrorContent undefined

  @returns Returns the JSX.Element of the component.

  @example

  Example 1: With global loading content
  <QueryFetchTemplate
    loading={loading}
    error={error}
    data={data}
    loadingContent={<div>Loading...</div>}
    noDataContent={<div>No data</div>}
  >
    {({ data }) => {
      return <div>{data}</div>;
    }}
  </QueryFetchTemplate>

  Example 2: With custom error content
  <QueryFetchTemplate
    loading={loading}
    error={error}
    data={data}
    loadingContent={<div>Loading...</div>}
    noDataContent={<div>No data</div>}
    showErrorToast={false}
    renderErrorContent={(error) => <div>{error.message}</div>}
  >
    {({ data }) => {
      return <div>{data}</div>;
    }}
  </QueryFetchTemplate>

  Example 3: With custom loading content for a individual component
  <QueryFetchTemplate
    loading={loading}
    error={error}
    data={data}
    noDataContent={<div>No data</div>}
  >
    {({ isLoading, data }) => {
      return isLoading ? <div>Loading...</div> : <div>{data}</div>;
    }}
 */
export const QueryFetchTemplate = <TData, TLoadingContent extends React.ReactNode>({
  loading,
  error,
  data,
  children,
  showErrorToast = true,
  renderErrorContent,
  loadingContent,
  noDataContent,
}: QueryFetchTemplateProps<TData, TLoadingContent>): JSX.Element => {
  const toast = useToast();

  useEffect(() => {
    if (showErrorToast && error) {
      toast.toast({
        title: 'Error',
        variant: 'destructive',
        description: error.message || "Couldn't fetch data. Please try again later.",
      });
    }
  }, [error, toast, showErrorToast]);

  if (loading) {
    return (
      <>
        {loadingContent ??
          children({ isLoading: true, data } as {
            isLoading: boolean;
            data: DataLoadingContent<TLoadingContent, TData>;
          })}
      </>
    );
  }
  if (error && !showErrorToast) return <QueryFetchErrorContent error={error} render={renderErrorContent} />;
  if (!data) return <>{noDataContent}</>;
  return <>{children({ isLoading: false, data })}</>;
};
