import { useState } from 'react';
import { useNavigate } from 'react-router';

import { supabase } from '../../lib/supabase';
import { WorkspaceShell } from './workspace/WorkspaceShell';

export function AuthenticatedHome() {
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

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
    <WorkspaceShell
      isSigningOut={isSigningOut}
      signOutError={signOutError}
      onSignOut={handleSignOut}
    />
  );
}
