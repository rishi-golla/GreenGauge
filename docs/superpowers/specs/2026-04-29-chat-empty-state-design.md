# Chat Empty-State Redesign

**Goal**
Refocus the `/workspace/chat` experience around the conversation itself by moving prompt presets into the empty state, reducing header copy, and shifting guidance into the composer.

**Scope**
- Applies only to the chat route.
- Preserves the existing workspace shell, message streaming, and preset prompt behavior.
- Introduces a compact post-send `Suggestions` control in the composer instead of a persistent prompt header.

**Design**
- Remove the page-level chat hero content on `/workspace/chat`, including the route title treatment and the local `Prompt Studio` section.
- Use the empty state as the only onboarding surface before a conversation starts.
- Present prompt presets inside the empty state as the primary first-action affordance.
- After the first user message, animate the empty state upward and out while the message stream takes over the canvas.
- Replace instructional paragraphs with input placeholder guidance: `Search assets, sectors, or ESG themes...`
- Shift chat typography to a more precise mono-driven treatment rather than the current serif-led presentation.

**Interaction Notes**
- Before the first message: preset chips are visible in the empty state.
- After the first message: presets are hidden from the main canvas and available through a compact `Suggestions` toggle in the composer.
- The `Suggestions` control reopens the same preset actions without reintroducing a permanent header.

**Implementation Notes**
- Quiet the workspace shell header on the chat route.
- Keep the chat interaction logic in `AIChatPage.tsx`.
- Extract small pure UI-state helpers so the empty-state/collapsed-suggestions logic can be covered with `node:test`.
