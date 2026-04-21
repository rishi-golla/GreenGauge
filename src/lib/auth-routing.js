export const DEFAULT_POST_AUTH_REDIRECT = '/workspace';

const AUTH_ENTRY_PATHS = new Set(['/login', '/signup']);

export function getSafeRedirectPath(redirectTo) {
  if (!redirectTo || !redirectTo.startsWith('/')) {
    return DEFAULT_POST_AUTH_REDIRECT;
  }

  if (redirectTo.startsWith('//') || redirectTo.includes('://') || AUTH_ENTRY_PATHS.has(redirectTo)) {
    return DEFAULT_POST_AUTH_REDIRECT;
  }

  return redirectTo;
}

export function shouldRedirectAuthenticatedUser(redirectTo) {
  if (!redirectTo) {
    return false;
  }

  return getSafeRedirectPath(redirectTo) !== DEFAULT_POST_AUTH_REDIRECT || redirectTo === DEFAULT_POST_AUTH_REDIRECT;
}

export function buildLoginRedirect(targetPath) {
  const params = new URLSearchParams({
    redirectTo: getSafeRedirectPath(targetPath),
  });

  return `/login?${params.toString()}`;
}
