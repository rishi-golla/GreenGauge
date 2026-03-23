import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_POST_AUTH_REDIRECT,
  getSafeRedirectPath,
  shouldRedirectAuthenticatedUser,
} from './auth-routing.js';

test('defaults unsafe redirect targets to the workspace', () => {
  assert.equal(getSafeRedirectPath(null), DEFAULT_POST_AUTH_REDIRECT);
  assert.equal(getSafeRedirectPath('https://example.com'), DEFAULT_POST_AUTH_REDIRECT);
  assert.equal(getSafeRedirectPath('//evil.test'), DEFAULT_POST_AUTH_REDIRECT);
  assert.equal(getSafeRedirectPath('/login'), DEFAULT_POST_AUTH_REDIRECT);
});

test('allows explicit visits to login or signup without redirecting authenticated users', () => {
  assert.equal(shouldRedirectAuthenticatedUser(null), false);
  assert.equal(shouldRedirectAuthenticatedUser(''), false);
});

test('redirects authenticated users when a safe post-auth target is present', () => {
  assert.equal(shouldRedirectAuthenticatedUser('/workspace'), true);
  assert.equal(shouldRedirectAuthenticatedUser('/portfolio?tab=risk'), true);
});
