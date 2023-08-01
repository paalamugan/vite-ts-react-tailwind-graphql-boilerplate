import type React from 'react';

import { NotFoundResult } from '@/components/ErrorBoundary/NotFoundResult';
import { ROUTER_PATH } from '@/routes/path';

export const PageNotFound: React.FC = () => {
  return (
    <NotFoundResult>
      <a href={ROUTER_PATH.ROOT}>Go to Home Page</a>
    </NotFoundResult>
  );
};

export const Component = PageNotFound;
