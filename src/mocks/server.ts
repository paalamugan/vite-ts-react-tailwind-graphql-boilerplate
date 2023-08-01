import { setupServer } from 'msw/node';

import { graphqlHandlers, restHandlers } from './handlers';

export const server = setupServer(...restHandlers, ...graphqlHandlers);
