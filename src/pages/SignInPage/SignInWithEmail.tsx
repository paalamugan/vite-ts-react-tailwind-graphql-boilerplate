import type React from 'react';

import { SignInLayout } from '@/layouts/SignInLayout/SignInLayout';

export const SignInWithEmail: React.FC = () => {
  return (
    <SignInLayout showBackButton>
      <h1>Email Login Form</h1>
    </SignInLayout>
  );
};

export const Component = SignInWithEmail;
