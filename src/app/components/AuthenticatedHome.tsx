import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { supabase } from '../../lib/supabase';
import { PortfolioConnectionProvider } from './workspace/PortfolioConnectionContext';
import { WorkspaceShell } from './workspace/WorkspaceShell';

export function AuthenticatedHome() {
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      const meta = data.user.user_metadata;
      const name = meta?.full_name ?? meta?.name ?? data.user.email ?? null;
      setUserName(name);
    });
  }, []);

  const handleSignOut = async () => {
    setSignOutError(null);
    setIsSigningOut(true);

    const { error } = await supabase.auth.signOut();

    setIsSigningOut(false);

    if (error) {
      setSignOutError(error.message);
      return;
    }

    void navigate('/login', { replace: true });
  };

  return (
    <PortfolioConnectionProvider>
      <WorkspaceShell
        isSigningOut={isSigningOut}
        signOutError={signOutError}
        onSignOut={handleSignOut}
        userName={userName}
      />
    </PortfolioConnectionProvider>
  );
}
