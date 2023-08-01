import { setupWorker } from 'msw';

import { graphqlHandlers, restHandlers } from './handlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...restHandlers, ...graphqlHandlers);
