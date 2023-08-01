/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError } from 'react-router-dom';

import { HttpError } from '@/shared/utils/http';

import { ErrorComponent } from './ErrorComponent';
import { InternalErrorResult } from './InternalErrorResult';
import { InternalServerErrorResult } from './InternalServerErrorResult';
import { NotFoundResult } from './NotFoundResult';

interface IProps<Response extends HttpError['response'] = any> {
  error?: Response;
}

export const RootErrorBoundary = <Response extends HttpError['response'] = any>(props: IProps<Response>) => {
  const routeError = useRouteError();

  const error = props.error ?? routeError;

  if (error instanceof HttpError) {
    switch (error.status) {
      case 500:
        return <InternalServerErrorResult />;
      case 401:
        return null;
      case 403:
      case 404:
        return <NotFoundResult />;
      default:
        return <InternalErrorResult />;
    }
  }

  if (error instanceof Error) {
    return (
      <InternalErrorResult>
        <ErrorComponent error={error} />
      </InternalErrorResult>
    );
  }

  return <InternalErrorResult />;
};
