import { useState } from 'react';

import { WorkspaceCard } from '../WorkspaceCard';
import { WorkspaceChip } from '../WorkspaceChip';
import { WorkspaceSectionHeading } from '../WorkspaceSectionHeading';
import { settingsGroups } from '../workspace-data';

export function SettingsPage() {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    Object.fromEntries(settingsGroups.map((group) => [group.title, group.options[0]])),
  );

  return (
    <>
      <section>
        <WorkspaceSectionHeading
          eyebrow="Workspace Control"
          title="Tune the way GreenGauge briefs, warns, and frames your portfolio."
          description="Settings stay intentionally lightweight for this prototype, but the controls should still feel trustworthy enough that the workspace reads like a real product."
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {settingsGroups.map((group) => (
          <WorkspaceCard key={group.title}>
            <p className="text-[0.74rem] uppercase tracking-[0.24em] text-white/44">{group.title}</p>
            <p
              className="mt-3 text-[1.7rem] leading-none tracking-[-0.04em] text-white"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              {selectedOptions[group.title]}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/62">{group.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {group.options.map((option) => (
                <WorkspaceChip
                  key={option}
                  isActive={selectedOptions[group.title] === option}
                  onClick={() =>
                    setSelectedOptions((current) => ({
                      ...current,
                      [group.title]: option,
                    }))
                  }
                >
                  {option}
                </WorkspaceChip>
              ))}
            </div>
          </WorkspaceCard>
        ))}
      </section>

      <WorkspaceCard className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/44">Prototype State</p>
          <p className="mt-3 text-sm leading-7 text-white/64">
            These preferences are being held locally in the current session so the signed-in experience behaves like a product without implying cloud persistence.
          </p>
        </div>
        <div className="rounded-full border border-[rgba(0,245,212,0.24)] bg-[rgba(0,245,212,0.08)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--verdant-mint)]">
          Saved locally
        </div>
      </WorkspaceCard>
    </>
  );
}
