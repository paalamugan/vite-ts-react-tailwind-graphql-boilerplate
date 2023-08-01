import matchers from '@testing-library/jest-dom/matchers';
import type { ReactNode } from 'react';
import { expect } from 'vitest';

import { server } from '@/mocks/server';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

vi.mock('zustand'); // to make it works like Jest (auto-mocking)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

vi.mock('@azure/msal-react', async () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const actual = await vi.importActual<typeof import('@azure/msal-react')>('@azure/msal-react');
  return {
    ...actual,
    MsalProvider: ({ children }: { children: ReactNode }) => children,
    useAccount: vi.fn(),
  };
});

const originalError = console.error;
beforeAll(() => {
  console.error = (...args: string[]) => {
    if (args[0] && /Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
