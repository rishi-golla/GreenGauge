import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, Eye, EyeOff, Link2, X } from 'lucide-react';

import { supabase } from '../../../../lib/supabase';
import { usePortfolioConnection } from '../PortfolioConnectionContext';
import { WorkspaceCard } from '../WorkspaceCard';

// ── Exports consumed by WorkspaceSidebar ──────────────────────────────────────
export const SETTINGS_STORAGE_KEY = 'greengauge_settings';
export const SETTINGS_UPDATED_EVENT = 'greengauge:settings-updated';

// ── Types ─────────────────────────────────────────────────────────────────────
type Settings = {
  account: { name: string };
  notifications: { emailDigest: boolean; riskAlerts: boolean; portfolioUpdates: boolean };
};

// ── Persistence ───────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS: Settings = {
  account: { name: 'Analyst Profile' },
  notifications: { emailDigest: true, riskAlerts: true, portfolioUpdates: false },
};

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      account: { ...DEFAULT_SETTINGS.account, ...parsed.account },
      notifications: { ...DEFAULT_SETTINGS.notifications, ...parsed.notifications },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function persistSettings(s: Settings) {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent(SETTINGS_UPDATED_EVENT));
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// ── Shared input style ────────────────────────────────────────────────────────
const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/88 outline-none transition placeholder:text-white/24 focus:border-[rgba(0,245,212,0.3)] focus:bg-white/[0.05]';

const labelCls = 'text-[0.68rem] uppercase tracking-[0.18em] text-white/36';

// ── Password modal ────────────────────────────────────────────────────────────
function PasswordModal({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');

  const mismatch = next.length > 0 && confirm.length > 0 && next !== confirm;
  const canSave = current.length > 0 && next.length >= 8 && next === confirm && state === 'idle';

  const handleSave = () => {
    if (!canSave) return;
    setState('saving');
    setTimeout(() => {
      setState('saved');
      setTimeout(onClose, 1400);
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="verdant-glass mx-4 w-full max-w-sm rounded-[1.6rem] p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-white/44">Security</p>
            <p className="mt-1 text-lg font-light text-white">Change password</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Fields */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="••••••••"
                className={`${inputCls} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/36 transition hover:text-white/70"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>New Password</label>
            <div className="relative">
              <input
                type={showNext ? 'text' : 'password'}
                value={next}
                onChange={(e) => setNext(e.target.value)}
                placeholder="Min. 8 characters"
                className={`${inputCls} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowNext((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/36 transition hover:text-white/70"
              >
                {showNext ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Confirm New Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat new password"
              className={`${inputCls} ${mismatch ? 'border-red-500/50 focus:border-red-500/60' : ''}`}
            />
            {mismatch && (
              <p className="text-[0.68rem] text-red-400">Passwords don't match</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          {state === 'saved' && (
            <span className="text-[0.76rem] uppercase tracking-[0.18em] text-[var(--verdant-mint)]">
              Updated ✓
            </span>
          )}
          <button
            onClick={onClose}
            className="rounded-full border border-white/12 px-5 py-2.5 text-[0.76rem] uppercase tracking-[0.18em] text-white/64 transition hover:border-white/24 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="rounded-full bg-[var(--verdant-mint)] px-5 py-2.5 text-[0.76rem] uppercase tracking-[0.18em] text-[#07211c] shadow-[0_0_20px_rgba(0,245,212,0.2)] transition hover:shadow-[0_0_28px_rgba(0,245,212,0.38)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {state === 'saving' ? 'Saving…' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--verdant-mint)] focus-visible:ring-offset-1 focus-visible:ring-offset-transparent ${
        checked ? 'bg-[var(--verdant-mint)]' : 'bg-white/12'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full shadow transition-transform duration-200 ${
          checked ? 'translate-x-5 bg-[#07211c]' : 'translate-x-0 bg-white/70'
        }`}
      />
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function SettingsPage() {
  const { connectBroker, connectedBrokers, isBrokerConnected } = usePortfolioConnection();
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [nameDraft, setNameDraft] = useState(settings.account.name);
  const [authEmail, setAuthEmail] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setAuthEmail(data.user?.email ?? '');
    });
  }, []);

  const profileDirty =
    nameDraft.trim() !== settings.account.name ||
    avatarUrl !== null;

  const updateSettings = useCallback((updater: (s: Settings) => Settings) => {
    setSettings((prev) => {
      const next = updater(prev);
      persistSettings(next);
      return next;
    });
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') setAvatarUrl(ev.target.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSaveProfile = () => {
    if (!profileDirty || saveState === 'saving') return;
    setSaveState('saving');
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      updateSettings((s) => ({
        ...s,
        account: { name: nameDraft.trim() },
      }));
      setSaveState('saved');
      saveTimerRef.current = setTimeout(() => setSaveState('idle'), 2200);
    }, 650);
  };

  useEffect(
    () => () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    },
    [],
  );

  const initials = getInitials(nameDraft || settings.account.name);

  return (
    <>
      {showPasswordModal && <PasswordModal onClose={() => setShowPasswordModal(false)} />}

      {/* ── Profile ── */}
      <section>
        <WorkspaceCard>
          <p className="text-[0.74rem] uppercase tracking-[0.24em] text-white/44">Profile</p>

          {/* Avatar + fields row */}
          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
            {/* Avatar column */}
            <div className="flex shrink-0 flex-col items-center gap-3">
              <div className="relative h-20 w-20">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover ring-2 ring-[rgba(0,245,212,0.25)]"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,#eef8f4_0%,#8ca59d_100%)] text-xl font-semibold text-[#10211d]">
                    {initials}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/14 bg-[rgba(14,18,17,0.88)] text-white/70 backdrop-blur-sm transition hover:border-[rgba(0,245,212,0.3)] hover:text-[var(--verdant-mint)]"
                  aria-label="Change profile photo"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[0.68rem] uppercase tracking-[0.18em] text-white/38 transition hover:text-white/70"
              >
                Change photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* Fields column */}
            <div className="flex flex-1 flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Display Name</label>
                  <input
                    type="text"
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveProfile()}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Email Address</label>
                  <input
                    type="email"
                    value={authEmail}
                    readOnly
                    placeholder="Loading…"
                    className={`${inputCls} cursor-default opacity-50`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider + actions */}
          <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="rounded-full border border-white/12 px-5 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-white/56 transition hover:border-white/22 hover:text-white"
            >
              Change Password
            </button>

            <div className="flex items-center gap-4">
              <span
                className={`text-[0.76rem] uppercase tracking-[0.18em] text-[var(--verdant-mint)] transition-opacity duration-300 ${
                  saveState === 'saved' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Saved ✓
              </span>
              <button
                onClick={handleSaveProfile}
                disabled={!profileDirty || saveState === 'saving'}
                className="rounded-full bg-[var(--verdant-mint)] px-6 py-2.5 text-[0.76rem] uppercase tracking-[0.18em] text-[#07211c] shadow-[0_0_20px_rgba(0,245,212,0.2)] transition hover:shadow-[0_0_28px_rgba(0,245,212,0.38)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {saveState === 'saving' ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </WorkspaceCard>
      </section>

      {/* ── Notifications ── */}
      <section>
        <WorkspaceCard>
          <p className="text-[0.74rem] uppercase tracking-[0.24em] text-white/44">
            Broker Connections
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => connectBroker('Robinhood')}
              className={`verdant-glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                isBrokerConnected('Robinhood')
                  ? 'border border-[rgba(0,245,212,0.22)] bg-[rgba(0,245,212,0.08)] text-[var(--verdant-mint)] shadow-[0_0_24px_rgba(0,245,212,0.12)] hover:border-[rgba(0,245,212,0.32)] hover:bg-[rgba(0,245,212,0.12)]'
                  : 'border border-white/10 bg-white/[0.03] text-white/78 hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <Link2 className="h-4 w-4" />
              {isBrokerConnected('Robinhood') ? 'Robinhood Connected' : 'Connect Robinhood'}
            </button>

            <button
              type="button"
              onClick={() => connectBroker('Fidelity')}
              className={`verdant-glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                isBrokerConnected('Fidelity')
                  ? 'border border-[rgba(0,245,212,0.22)] bg-[rgba(0,245,212,0.08)] text-[var(--verdant-mint)] shadow-[0_0_24px_rgba(0,245,212,0.12)] hover:border-[rgba(0,245,212,0.32)] hover:bg-[rgba(0,245,212,0.12)]'
                  : 'border border-white/10 bg-white/[0.03] text-white/78 hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <Link2 className="h-4 w-4" />
              {isBrokerConnected('Fidelity') ? 'Fidelity Connected' : 'Connect Fidelity'}
            </button>

            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-white/48">
              {connectedBrokers.length > 0
                ? `${connectedBrokers.join(', ')} linked`
                : 'Demo brokers ready'}
            </div>
          </div>

          <p className="mt-4 text-[0.78rem] leading-6 text-white/40">
            Demo-only connection controls for the current prototype. Live brokerage
            authentication can be wired into the same settings flow later.
          </p>
        </WorkspaceCard>
      </section>

      <section>
        <WorkspaceCard>
          <p className="text-[0.74rem] uppercase tracking-[0.24em] text-white/44">Notifications</p>
          <div className="mt-2 flex flex-col divide-y divide-white/[0.06]">
            {(
              [
                {
                  key: 'emailDigest',
                  label: 'Weekly email digest',
                  sub: 'Summary of portfolio ESG movements every Monday',
                },
                {
                  key: 'riskAlerts',
                  label: 'Risk alerts',
                  sub: 'Notify when a holding crosses your alert threshold',
                },
                {
                  key: 'portfolioUpdates',
                  label: 'Portfolio updates',
                  sub: 'Confirm when holdings are added, edited, or removed',
                },
              ] as const
            ).map(({ key, label, sub }) => (
              <div key={key} className="flex items-center justify-between gap-6 py-4">
                <div>
                  <p className="text-sm text-white/82">{label}</p>
                  <p className="mt-0.5 text-[0.72rem] text-white/38">{sub}</p>
                </div>
                <Toggle
                  checked={settings.notifications[key]}
                  onChange={(v) =>
                    updateSettings((s) => ({
                      ...s,
                      notifications: { ...s.notifications, [key]: v },
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </WorkspaceCard>
      </section>
    </>
  );
}
