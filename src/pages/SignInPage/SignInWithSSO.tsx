import { useAccount } from '@azure/msal-react';
import type React from 'react';
import type { Location, NavigateProps } from 'react-router-dom';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { SignInLayout } from '@/layouts/SignInLayout/SignInLayout';
import { useAuth } from '@/providers/AuthProvider';
import { ROUTER_PATH } from '@/routes/path';

export const SignInWithSSO: React.FC = () => {
  const { signIn } = useAuth();
  const account = useAccount();

  const { state } = useLocation() as { state: { from: Location } };

  const fromLocation: Location = state?.from;
  const pathname: NavigateProps['to'] = fromLocation?.pathname || ROUTER_PATH.ROOT;

  const signInHandler = async () => {
    await signIn();
  };
  if (account) return <Navigate to={pathname} replace />;

  return (
    <SignInLayout>
      <div className="flex flex-col items-center gap-3">
        <Button id="signInButton" onClick={() => void signInHandler()}>
          Sign In With SSO
        </Button>

        <Link
          to={ROUTER_PATH.SIGN_IN_EMAIL}
          className="mt-2 block w-full rounded py-2 text-center text-base  font-medium leading-6 text-indigo-700
"
        >
          Sign in with email instead
        </Link>
      </div>
    </SignInLayout>
  );
};

export const Component = SignInWithSSO;
