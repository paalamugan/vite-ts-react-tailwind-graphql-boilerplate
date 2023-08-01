import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTER_PATH } from '@/routes/path';

import { Button } from '../ui/button';

interface AuthenticationErrorProps {
  error: Error;
}
export const AuthenticationError: React.FC<AuthenticationErrorProps> = ({ error }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex min-h-[40px] gap-2 bg-white p-6 text-red-600">
          <h1 className="whitespace-nowrap text-xl font-bold">Authentication Error:</h1>
          <h2 className="text-lg font-semibold">{error.message}</h2>
        </div>
        <Button
          id="gotToSignin"
          variant="outline"
          onClick={() =>
            navigate(ROUTER_PATH.SIGN_IN, {
              state: {
                from: location,
              },
            })
          }
        >
          Go to Sign In
        </Button>
      </div>
    </div>
  );
};
