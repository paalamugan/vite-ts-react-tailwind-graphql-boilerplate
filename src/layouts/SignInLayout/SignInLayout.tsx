import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

import ReactLogo from '@/assets/react.svg';

interface SignInLayoutProps {
  showBackButton?: boolean;
  children: React.ReactNode;
}
export const SignInLayout: React.FC<SignInLayoutProps> = ({ children, showBackButton }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-full items-center bg-indigo-700">
      <div className="w-full">
        <div className="m-auto mb-4 block max-w-lg rounded-2xl bg-white p-8 shadow">
          <div className="flex items-center py-2">
            {showBackButton && (
              <button type="button" onClick={goBack}>
                <ArrowLeftIcon className="-mr-0.5 h-6 w-6 flex-none text-indigo-700" aria-hidden="true" />
              </button>
            )}
            <img data-testid="logo" src={ReactLogo} alt="logo" className="mx-auto" />
          </div>
          <p data-testid="title" className="my-8 text-center font-sans text-3xl font-bold text-gray-900">
            Sign in to your account
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};
