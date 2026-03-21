import { createBrowserRouter } from 'react-router';

import { Home } from './components/Home';
import { Login } from './components/Login';
import { MarketingShell } from './components/MarketingShell';

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
      },
    ],
  },
]);
