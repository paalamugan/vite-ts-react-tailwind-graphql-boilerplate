import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { AuthenticateRoute } from '@/components/Authentication/AuthenticateRoute';
import { RootErrorBoundary } from '@/components/ErrorBoundary/RootErrorBoundary';
import { RootLayout } from '@/layouts/RootLayout';

import { ROUTER_PATH } from './path';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTER_PATH.ROOT} element={<RootLayout />} errorElement={<RootErrorBoundary />}>
      {/* private routes */}
      <Route element={<AuthenticateRoute />}>
        <Route path={ROUTER_PATH.ROOT} lazy={() => import('@/pages/Home')} />
      </Route>
      {/* public routes */}
      <Route>
        <Route path={ROUTER_PATH.SIGN_IN}>
          <Route index={true} lazy={() => import('@/pages/SignInPage/SignInWithSSO')} />
          <Route path={ROUTER_PATH.SIGN_IN_SSO} lazy={() => import('@/pages/SignInPage/SignInWithSSO')} />
          <Route path={ROUTER_PATH.SIGN_IN_EMAIL} lazy={() => import('@/pages/SignInPage/SignInWithEmail')} />
        </Route>
        <Route path={ROUTER_PATH.SIGN_OUT} lazy={() => import('@/pages/SignOutPage')} />
        <Route path={ROUTER_PATH.REDIRECT} lazy={() => import('@/pages/SignInRedirectPage')} />
        <Route path="*" lazy={() => import('@/pages/PageNotFound')} />
      </Route>
    </Route>,
  ),
);
