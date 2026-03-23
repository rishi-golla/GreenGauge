import { useState } from 'react';

import { WorkspaceCard } from '../WorkspaceCard';
import { WorkspaceChip } from '../WorkspaceChip';
import { WorkspaceMetricCard } from '../WorkspaceMetricCard';
import { WorkspaceSectionHeading } from '../WorkspaceSectionHeading';
import { riskBreakdowns, riskScenarios } from '../workspace-data';

export function RiskPage() {
  const [scenarioId, setScenarioId] = useState(riskScenarios[0]?.id ?? '');
  const activeScenario = riskScenarios.find((scenario) => scenario.id === scenarioId) ?? riskScenarios[0];

  return (
    <>
      <section>
        <WorkspaceSectionHeading
          eyebrow="Scenario Pressure"
          title="Stress the portfolio before the pressure arrives in reporting."
          description="These scenarios are meant to expose where climate drag compounds fastest, which clusters become fragile first, and where small reallocations create the largest resilience gain."
        />
        <div className="mt-6 flex flex-wrap gap-2">
          {riskScenarios.map((scenario) => (
            <WorkspaceChip
              key={scenario.id}
              isActive={scenario.id === activeScenario.id}
              onClick={() => setScenarioId(scenario.id)}
            >
              {scenario.label}
            </WorkspaceChip>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <WorkspaceMetricCard
          label="Scenario-linked exposure"
          value={activeScenario.exposure}
          detail="Concentrated drag"
          accent="warm"
        />
        <WorkspaceMetricCard
          label="Projected resilience"
          value={activeScenario.resilience}
          detail="Modeled index"
          accent="mint"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <WorkspaceCard>
          <p
            className="text-[2rem] leading-[1.45] tracking-[-0.03em] text-white sm:text-[2.4rem]"
            style={{ fontFamily: 'var(--font-insight)', fontWeight: 400 }}
          >
            {activeScenario.headline}
          </p>
          <div className="mt-8 space-y-4">
            {activeScenario.riskDrivers.map((driver, index) => (
              <div key={driver} className="rounded-[1.2rem] border border-white/8 bg-black/10 px-4 py-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/34">Driver 0{index + 1}</p>
                <p className="mt-3 text-sm leading-7 text-white/66">{driver}</p>
              </div>
            ))}
          </div>
        </WorkspaceCard>

        <WorkspaceCard>
          <p className="text-[0.74rem] uppercase tracking-[0.26em] text-white/44">Cluster Weight</p>
          <div className="mt-5 space-y-4">
            {riskBreakdowns.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/72">{item.label}</p>
                  <p className="text-sm text-[var(--verdant-mint)]">{item.value}</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-[var(--verdant-mint)]" style={{ width: item.value }} />
                </div>
                <p className="mt-2 text-xs text-white/44">{item.detail}</p>
              </div>
            ))}
          </div>
        </WorkspaceCard>
      </section>
    </>
  );
}

