import { createBrowserRouter, redirect } from 'react-router';

import { AuthenticatedHome } from './components/AuthenticatedHome';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { MarketingShell } from './components/MarketingShell';
import { Signup } from './components/Signup';
import { AssetsPage } from './components/workspace/pages/AssetsPage';
import { AIChatPage } from './components/workspace/pages/AIChatPage';
import { CompanyDetailPage } from './components/workspace/pages/CompanyDetailPage';
import { DashboardPage } from './components/workspace/pages/DashboardPage';
import { RiskPage } from './components/workspace/pages/RiskPage';
import { SettingsPage } from './components/workspace/pages/SettingsPage';
import {
  buildLoginRedirect,
  getSafeRedirectPath,
  shouldRedirectAuthenticatedUser,
} from '../lib/auth-routing';
import { supabase } from '../lib/supabase';

async function redirectAuthenticatedUser(request: Request) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const requestUrl = new URL(request.url);
  const redirectTo = requestUrl.searchParams.get('redirectTo');

  if (!shouldRedirectAuthenticatedUser(redirectTo)) {
    return null;
  }

  throw redirect(getSafeRedirectPath(redirectTo));
}

async function requireAuthenticatedUser(request: Request) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return null;
  }

  const requestUrl = new URL(request.url);
  const requestedPath = `${requestUrl.pathname}${requestUrl.search}${requestUrl.hash}`;

  throw redirect(buildLoginRedirect(requestedPath));
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MarketingShell,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
        loader: ({ request }) => redirectAuthenticatedUser(request),
      },
      {
        path: 'signup',
        Component: Signup,
        loader: ({ request }) => redirectAuthenticatedUser(request),
      },
      {
        path: 'workspace',
        Component: AuthenticatedHome,
        loader: ({ request }) => requireAuthenticatedUser(request),
        children: [
          {
            index: true,
            loader: () => redirect('/workspace/dashboard'),
          },
          {
            path: 'dashboard',
            Component: DashboardPage,
          },
          {
            path: 'company/:ticker',
            Component: CompanyDetailPage,
          },
          {
            path: 'assets',
            Component: AssetsPage,
          },
          {
            path: 'risk',
            Component: RiskPage,
          },
          {
            path: 'chat',
            Component: AIChatPage,
          },
          {
            path: 'settings',
            Component: SettingsPage,
          },
        ],
      },
    ],
  },
]);
