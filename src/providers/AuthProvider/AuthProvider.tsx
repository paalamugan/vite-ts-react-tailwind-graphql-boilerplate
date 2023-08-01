import type { AccountInfo } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import type { ReactNode } from 'react';
import React, { useCallback, useMemo, useReducer } from 'react';

import { loginRequest } from '@/components/Authentication/msalAuthConfig';
import { toast } from '@/components/ui/use-toast';
import type { UserInfo } from '@/types/common';

// TODO: Remove this after implementing Sign In with Email
const dummyUser = {
  id: '5288c32e-3e5b-403f-a815-f442ca406339',
  displayName: 'Test User',
  givenName: 'Test User',
  surname: 'User',
  mail: 'Test.User@test.com',
  mobilePhone: '8768782493',
  employeeId: '198827',
  roles: ['ADMIN'],
};

interface LoginForm {
  email: string;
  password: string;
}

interface AuthContextType {
  user: UserInfo | null;
  account: AccountInfo | null;
  isLoggedIn: boolean;
  signIn: (formData?: LoginForm) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: UserInfo | null) => void;
  setAccount: (account: AccountInfo | null) => void;
  reset: () => void;
  setAuth: ({ user, account }: { user: UserInfo | null; account: AccountInfo | null }) => void;
}

const initialState: AuthContextType = {
  user: dummyUser, // TODO: Set back to null once SSO is implemented completely.
  account: null,
  isLoggedIn: false,
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  setUser: () => null,
  setAccount: () => null,
  reset: () => null,
  setAuth: () => null,
};

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

type ReducerActionType =
  | {
      type: 'SET_USER';
      payload: AuthContextType['user'];
    }
  | {
      type: 'SET_ACCOUNT';
      payload: AuthContextType['account'];
    }
  | {
      type: 'RESET';
    };

const reducer = (state: AuthContextType, action: ReducerActionType) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ACCOUNT':
      return { ...state, account: action.payload };
    case 'RESET':
      return { ...state, user: null, account: null };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { instance: msalInstance } = useMsal();

  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = useCallback((user: AuthContextType['user']) => {
    dispatch({ type: 'SET_USER', payload: user });
  }, []);

  const setAccount = useCallback((account: AuthContextType['account']) => {
    dispatch({ type: 'SET_ACCOUNT', payload: account });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const setAuth: AuthContextType['setAuth'] = useCallback(
    ({ user, account }) => {
      //TODO: Remove when roles exist in AD
      if (user) {
        user.roles = ['ADMIN'];
      }

      setUser(user);
      setAccount(account);
    },
    [setUser, setAccount],
  );

  const signIn = useCallback(
    async (data?: LoginForm) => {
      try {
        if (!data) {
          await msalInstance.loginRedirect({
            ...loginRequest,
          });
        } else {
          setUser(dummyUser); // TODO: For Sign In with Email
        }
      } catch (err) {
        const error = err as Error;
        toast({
          title: 'Error',
          variant: 'destructive',
          description: error.message || "Couldn't sign in. Please try again later.",
        });
        reset();
      }
    },
    [setUser, reset, msalInstance],
  );

  const signOut = useCallback(async () => {
    try {
      await msalInstance.logoutRedirect({
        account: state.account,
      });
    } catch (err) {
      const error = err as Error;
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error.message || "Couldn't sign out. Please try again later.",
      });
    }
  }, [state, msalInstance]);

  const isLoggedIn = !!state.user;

  const value = useMemo(
    () => ({
      ...state,
      isLoggedIn,
      signIn,
      signOut,
      setUser,
      setAccount,
      reset,
      setAuth,
    }),
    [isLoggedIn, reset, setAccount, setUser, signIn, signOut, setAuth, state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
