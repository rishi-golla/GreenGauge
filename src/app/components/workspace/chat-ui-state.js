export const CHAT_INPUT_PLACEHOLDER = 'Search assets, sectors, or ESG themes...';

export function getChatPresentationState(messageCount, isSuggestionsOpen) {
  const hasConversation = messageCount > 0;

  return {
    hasConversation,
    showEmptyStatePrompts: !hasConversation,
    showSuggestionsButton: hasConversation,
    showSuggestionsTray: hasConversation && isSuggestionsOpen,
  };
}
