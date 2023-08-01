import type { ComponentType, ReactNode } from 'react';
import { ErrorBoundary as Boundary } from 'react-error-boundary';

import { RootErrorBoundary } from './RootErrorBoundary';

export interface FallbackProps<ErrorType> {
  error: ErrorType;
  resetErrorBoundary: (...args: unknown[]) => void;
}

export type ErrorFallback<ErrorType> = ComponentType<FallbackProps<ErrorType>>;

interface ErrorBoundaryProps<ErrorType> {
  onReset?: () => void;
  onError?: (
    error: Error,
    info: {
      componentStack: string;
    },
  ) => void;
  fallback?: ErrorFallback<ErrorType>;
  resetKeys?: unknown[];
}

export interface IErrorBoundaryProps<ErrorType> extends ErrorBoundaryProps<ErrorType> {
  children: ReactNode;
}

export function ErrorBoundary<ErrorType extends Error>({
  fallback,
  children,
  ...props
}: IErrorBoundaryProps<ErrorType>) {
  return (
    <Boundary FallbackComponent={fallback ?? RootErrorBoundary} {...props}>
      {children}
    </Boundary>
  );
}
