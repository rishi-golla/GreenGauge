import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Paperclip } from 'lucide-react';

import { WorkspaceSectionHeading } from '../WorkspaceSectionHeading';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
};

export function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      const assistantId = `assistant-${Date.now()}`;
      const history = messages
        .filter((m) => !m.streaming)
        .map(({ role, content }) => ({ role, content }));

      const nextHistory = [...history, { role: 'user' as const, content: trimmed }];

      setMessages((prev) => [
        ...prev.filter((m) => !m.streaming),
        { id: `user-${Date.now()}`, role: 'user', content: trimmed },
        { id: assistantId, role: 'assistant', content: '', streaming: true },
      ]);
      setInput('');
      setIsStreaming(true);

      abortRef.current = new AbortController();

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextHistory }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error(`API error ${res.status}`);
        if (!res.body) throw new Error('No response body');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        outer: while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const lines = decoder.decode(value, { stream: true }).split('\n');
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const payload = line.slice(6).trim();
            if (payload === '[DONE]') break outer;
            try {
              const { text, error } = JSON.parse(payload);
              if (error) throw new Error(error);
              if (text) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: m.content + text } : m,
                  ),
                );
              }
            } catch {
              // ignore malformed SSE lines
            }
          }
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: 'Something went wrong — please try again.', streaming: false }
                : m,
            ),
          );
        }
      }

      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, streaming: false } : m)),
      );
      setIsStreaming(false);
      abortRef.current = null;
    },
    [isStreaming, messages],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <section>
        <WorkspaceSectionHeading
          eyebrow="Prompt Studio"
          title="Query the portfolio like you are working beside a climate specialist."
          description="Ask about any company, sector, or ESG theme."
        />
      </section>

      {messages.length === 0 ? (
        <section className="flex flex-1 items-center justify-center py-20">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(0,245,212,0.07)]">
              <span className="h-3 w-3 rounded-full bg-[var(--verdant-mint)] shadow-[0_0_18px_rgba(0,245,212,0.85)]" />
            </div>
            <p className="mt-5 text-[0.74rem] uppercase tracking-[0.28em] text-white/38">
              Greengauge Intelligence
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/28">
              Ask about any holding, sector, or ESG scenario.
            </p>
          </div>
        </section>
      ) : (
        <section className="flex flex-col gap-5 pb-2">
          {messages.map((msg) =>
            msg.role === 'user' ? (
              <div key={msg.id} className="flex justify-end">
                <div className="verdant-glass max-w-[78%] rounded-[1.4rem] rounded-br-md px-5 py-4">
                  <p className="text-sm leading-relaxed text-white/88">{msg.content}</p>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(0,245,212,0.08)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--verdant-mint)] shadow-[0_0_10px_rgba(0,245,212,0.9)]" />
                </div>
                <div className="verdant-glass max-w-[85%] flex-1 rounded-[1.4rem] rounded-tl-md px-6 py-5">
                  <p className="mb-3 text-[0.68rem] uppercase tracking-[0.2em] text-white/36">
                    Greengauge Intelligence
                  </p>
                  <p className="whitespace-pre-line text-sm leading-[1.85] text-white/82">
                    {msg.content}
                    {msg.streaming && (
                      <span className="ml-px inline-block h-[1.1em] w-0.5 translate-y-[0.15em] animate-pulse rounded-sm bg-[var(--verdant-mint)]" />
                    )}
                  </p>
                </div>
              </div>
            ),
          )}
          <div ref={bottomRef} />
        </section>
      )}

      <div className="sticky bottom-0 z-10 pt-2 pb-1">
        <div className="verdant-glass flex items-center gap-3 rounded-[1.6rem] px-4 py-4 sm:px-5">
          <button
            type="button"
            disabled={isStreaming}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/72 transition hover:text-white disabled:opacity-40"
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            placeholder="Query the environmental baseline…"
            className="min-w-0 flex-1 bg-transparent text-sm text-white/82 outline-none placeholder:text-white/28 disabled:opacity-50 sm:text-base"
            aria-label="Chat input"
          />

          <button
            type="button"
            onClick={() => sendMessage(input)}
            disabled={isStreaming || !input.trim()}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--verdant-mint)] text-[#07211c] shadow-[0_0_24px_rgba(0,245,212,0.28)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            aria-label="Send prompt"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-2 text-center text-[0.72rem] uppercase tracking-[0.28em] text-white/20">
          Atmospheric Intelligence Engine · v2.4.1
        </p>
      </div>
    </>
  );
}
