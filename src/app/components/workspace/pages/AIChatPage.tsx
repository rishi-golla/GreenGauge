import { useState } from 'react';
import { ArrowRight, Mic, Paperclip } from 'lucide-react';

import { WorkspaceCard } from '../WorkspaceCard';
import { WorkspaceChip } from '../WorkspaceChip';
import { WorkspaceSectionHeading } from '../WorkspaceSectionHeading';
import { chatThreads } from '../workspace-data';

function highlightPhrases(copy: string, phrases: string[]) {
  const escaped = phrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');

  return copy.split(pattern).map((segment, index) => {
    const matched = phrases.some((phrase) => phrase.toLowerCase() === segment.toLowerCase());

    if (!matched) {
      return <span key={`${segment}-${index}`}>{segment}</span>;
    }

    return (
      <span key={`${segment}-${index}`} className="verdant-highlight">
        {segment}
      </span>
    );
  });
}

export function AIChatPage() {
  const [threadId, setThreadId] = useState(chatThreads[0]?.id ?? '');
  const activeThread = chatThreads.find((thread) => thread.id === threadId) ?? chatThreads[0];

  return (
    <>
      <section>
        <WorkspaceSectionHeading
          eyebrow="Prompt Studio"
          title="Query the portfolio like you are working beside a climate specialist."
          description="This surface is meant to stay cinematic, but it now behaves more like a product: presets shift the narrative, metrics, and analytical emphasis without leaving the workspace."
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {chatThreads.map((thread) => (
            <WorkspaceChip key={thread.id} isActive={thread.id === activeThread.id} onClick={() => setThreadId(thread.id)}>
              {thread.promptLabel}
            </WorkspaceChip>
          ))}
        </div>
      </section>

      <section className="pt-1">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--verdant-mint)] shadow-[0_0_14px_rgba(0,245,212,0.85)]" />
          <p className="text-[0.74rem] uppercase tracking-[0.28em] text-white/70">Greengauge Intelligence</p>
        </div>

        <WorkspaceCard className="mt-4 rounded-[1.8rem] px-6 py-7 sm:px-7 sm:py-8 lg:max-w-[58rem]">
          <p
            className="max-w-4xl text-[2rem] leading-[1.45] tracking-[-0.025em] text-white sm:text-[2.35rem]"
            style={{ fontFamily: 'var(--font-insight)', fontWeight: 400 }}
          >
            {highlightPhrases(activeThread.intelligenceCopy, activeThread.intelligenceHighlights)}
          </p>
        </WorkspaceCard>
      </section>

      <section className="flex justify-end">
        <div className="w-full max-w-[49rem]">
          <p className="pr-2 text-right text-[0.74rem] uppercase tracking-[0.28em] text-white/54">Senior Analyst</p>
          <WorkspaceCard className="mt-3 rounded-[1.55rem] px-6 py-6 sm:px-7">
            <p
              className="text-lg leading-8 text-white/86 sm:text-[1.7rem] sm:leading-[1.7]"
              style={{ fontFamily: 'var(--font-insight)', fontStyle: 'italic', fontWeight: 400 }}
            >
              "{activeThread.analystPrompt}"
            </p>
          </WorkspaceCard>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--verdant-mint)] shadow-[0_0_14px_rgba(0,245,212,0.85)]" />
          <p className="text-[0.74rem] uppercase tracking-[0.28em] text-white/70">Live Analysis</p>
        </div>

        <WorkspaceCard className="mt-4 rounded-[1.8rem] px-6 py-7 sm:px-7 sm:py-8">
          <p
            className="max-w-5xl text-[1.9rem] leading-[1.5] tracking-[-0.025em] text-white sm:text-[2.2rem]"
            style={{ fontFamily: 'var(--font-insight)', fontWeight: 400 }}
          >
            {highlightPhrases(activeThread.analysisCopy, activeThread.analysisHighlights)}
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {activeThread.metrics.map((metric) => (
              <WorkspaceCard
                key={metric.label}
                className={metric.accent === 'mint' ? 'bg-[rgba(0,245,212,0.07)]' : 'bg-[rgba(8,10,10,0.24)]'}
              >
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/52">{metric.label}</p>
                <div className="mt-4 flex items-end gap-3">
                  <p className="text-4xl tracking-[-0.04em] text-white">{metric.value}</p>
                  <p className={metric.accent === 'mint' ? 'pb-1 text-sm text-[var(--verdant-mint)]' : 'pb-1 text-sm text-[#f3a79f]'}>
                    {metric.detail}
                  </p>
                </div>
              </WorkspaceCard>
            ))}
          </div>
        </WorkspaceCard>
      </section>

      <div className="relative z-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3">
          <div className="verdant-glass flex items-center gap-3 rounded-[1.6rem] px-4 py-4 sm:px-5">
            <button
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/72 transition hover:text-white"
              aria-label="Attach file"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            <input
              type="text"
              placeholder="Query the environmental baseline..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white/82 outline-none placeholder:text-white/28 sm:text-base"
              aria-label="Chat input"
            />

            <button
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/72 transition hover:text-white"
              aria-label="Use microphone"
            >
              <Mic className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--verdant-mint)] text-[#07211c] shadow-[0_0_24px_rgba(0,245,212,0.28)] transition hover:scale-[1.02]"
              aria-label="Send prompt"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <p className="text-center text-[0.72rem] uppercase tracking-[0.28em] text-white/20">
            Atmospheric Intelligence Engine · v2.4.1
          </p>
        </div>
      </div>
    </>
  );
}

