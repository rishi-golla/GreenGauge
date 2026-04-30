import test from 'node:test';
import assert from 'node:assert/strict';

import { CHAT_INPUT_PLACEHOLDER, getChatPresentationState } from './chat-ui-state.js';

test('keeps prompt presets in the empty state before a conversation starts', () => {
  assert.deepEqual(getChatPresentationState(0, false), {
    hasConversation: false,
    showEmptyStatePrompts: true,
    showSuggestionsButton: false,
    showSuggestionsTray: false,
  });
});

test('collapses prompt presets into the composer after the first message', () => {
  assert.deepEqual(getChatPresentationState(1, false), {
    hasConversation: true,
    showEmptyStatePrompts: false,
    showSuggestionsButton: true,
    showSuggestionsTray: false,
  });
});

test('only opens the suggestions tray once a conversation exists', () => {
  assert.equal(getChatPresentationState(0, true).showSuggestionsTray, false);
  assert.equal(getChatPresentationState(3, true).showSuggestionsTray, true);
});

test('uses the composer placeholder as the only instructional copy', () => {
  assert.equal(CHAT_INPUT_PLACEHOLDER, 'Search assets, sectors, or ESG themes...');
});
