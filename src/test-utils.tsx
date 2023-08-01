/* eslint-disable no-restricted-imports */
/* eslint-disable import/export */
import { stubbedPublicClientApplication } from '@azure/msal-browser';
import { useAccount } from '@azure/msal-react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import type React from 'react';
import { MemoryRouter } from 'react-router';
import type { MemoryRouterProps } from 'react-router-dom';

import { Providers } from './providers';
import * as msalHelper from './shared/helpers/msal.helper';

const mockUseAccount = vi.mocked(useAccount);
const getMSALInstanceSpyOn = vi.spyOn(msalHelper, 'getMsalPublicClientApplication');

beforeEach(() => {
  mockUseAccount.mockReturnValue({
    environment: 'DEV',
    homeAccountId: '123',
    localAccountId: '123',
    name: 'John Deo',
    tenantId: '111',
    username: 'test',
  });
  getMSALInstanceSpyOn.mockReturnValue(stubbedPublicClientApplication);
});

interface WrapperComponentProps {
  children: React.ReactNode;
  router?: MemoryRouterProps;
}
// eslint-disable-next-line react-refresh/only-export-components
const WrapperComponent: React.FC<WrapperComponentProps> = ({ children, router }) => {
  return (
    <MemoryRouter {...router}>
      <Providers>{children}</Providers>
    </MemoryRouter>
  );
};

interface ExtendedRenderOptions extends RenderOptions {
  router?: MemoryRouterProps;
}

export const customRender = (ui: React.ReactElement, { router, ...renderOptions }: ExtendedRenderOptions = {}) => {
  const Wrapper = ({ children }: WrapperComponentProps) => (
    <WrapperComponent router={router}>{children}</WrapperComponent>
  );
  return { user: userEvent.setup(), ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

// override render export
export { customRender as render, userEvent };
