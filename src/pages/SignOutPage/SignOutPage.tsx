import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/providers/AuthProvider';
import { ROUTER_PATH } from '@/routes/path';

export const SignOutPage: React.FC = () => {
  const { reset } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    reset();
    navigate(ROUTER_PATH.SIGN_IN, { replace: true });
  }, [reset, navigate]);

  return null;
};

export const Component = SignOutPage;
