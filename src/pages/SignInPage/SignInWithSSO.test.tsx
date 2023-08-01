import { useAccount } from '@azure/msal-react';

import { ROUTER_PATH } from '@/routes/path';
import { render, screen } from '@/test-utils';

import { SignInWithSSO } from './SignInWithSSO';

const mockUseAccount = vi.mocked(useAccount);
const setup = () => {
  const { user } = render(<SignInWithSSO />, {
    router: { initialEntries: [ROUTER_PATH.SIGN_IN_SSO] },
  });
  return { user };
};
describe('SignInPage', () => {
  beforeEach(() => {
    mockUseAccount.mockReturnValue(null);
  });

  it('sign in page logo rendered correctly', async () => {
    setup();
    const logoElement = await screen.findByTestId('logo');
    expect(logoElement).toBeInTheDocument();
  });

  it('sign in page title rendered with correct title', async () => {
    setup();
    const titleElement = await screen.findByTestId('title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe('Sign in to your account');
  });
});
