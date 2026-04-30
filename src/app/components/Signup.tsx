import { type FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { getSafeRedirectPath } from '../../lib/auth-routing';
import { supabase } from '../../lib/supabase';

export function Signup() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = getSafeRedirectPath(new URLSearchParams(search).get('redirectTo'));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      void navigate(redirectTo, { replace: true });
      return;
    }

    setMessage('Check your inbox to confirm your email before signing in.');
  };

  return (
    <>
      <header>
        <nav className="flex items-center justify-between px-6 py-8 sm:px-10 lg:px-10 lg:py-10 xl:px-10">
          <Link
            to="/"
            className="text-3xl tracking-[-0.03em] text-foreground no-underline sm:text-[2rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            GreenGauge
          </Link>

          <Link
            to="/"
            className="liquid-glass inline-flex items-center rounded-full border border-white/16 px-5 py-2.5 text-sm text-white/82 no-underline transition-colors duration-300 hover:text-foreground"
          >
            Back to Home
          </Link>
        </nav>
      </header>

      <main className="flex flex-1 items-center px-6 pb-12 sm:px-10 lg:px-10">
        <div className="relative mx-auto w-full max-w-[82rem]">
          <div className="absolute left-1/2 top-[-40px] bottom-[-40px] z-0 w-screen -translate-x-1/2 bg-[linear-gradient(180deg,rgba(3,14,18,0)_0%,rgba(3,14,18,0.82)_14%,rgba(3,14,18,0.88)_50%,rgba(3,14,18,0.82)_86%,rgba(3,14,18,0)_100%)]" />
          <div className="relative z-10 grid w-full gap-14 lg:min-h-[58vh] lg:grid-cols-[minmax(0,1.14fr)_31rem] lg:items-start">
          <section className="max-w-2xl animate-fade-rise">
            <p className="mb-5 text-sm uppercase tracking-[0.28em] text-white/52">Create access</p>
            <h1
              className="max-w-3xl text-5xl leading-[0.9] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[5.9rem]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              Start a calmer read on the climate exposure inside your portfolio.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/68">
              Create your GreenGauge account to begin tracking financed emissions, transition
              pressure, and the holdings that shape environmental risk.
            </p>

            <div className="mt-12 hidden max-w-2xl grid-cols-2 gap-5 sm:grid lg:grid-cols-2">
              <div className="liquid-glass rounded-[1.75rem] border border-white/10 px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/45">Start with</p>
                <p
                  className="mt-3 text-[2rem] tracking-[-0.03em] text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Portfolio x-ray
                </p>
              </div>
              <div className="liquid-glass rounded-[1.75rem] border border-white/10 px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/45">Built for</p>
                <p
                  className="mt-3 text-[2rem] tracking-[-0.03em] text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Evidence-led insight
                </p>
              </div>
            </div>
          </section>

          <section className="animate-fade-rise-delay lg:justify-self-end lg:pt-0">
            <div className="liquid-glass relative overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.06] px-8 py-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] sm:px-8 sm:py-8">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.24em] text-white/46">New account</p>
                <h2
                  className="mt-4 text-4xl leading-none tracking-[-0.04em] text-foreground sm:text-[3rem]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                >
                  Sign up
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-white/64">
                  Add a few details to open your GreenGauge workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2.5">
                  <label htmlFor="fullName" className="block text-sm text-white/72">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl border border-white/14 bg-white/[0.05] px-4 py-3.5 text-sm text-foreground placeholder:text-white/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition duration-300 focus:border-white/30 focus:bg-white/[0.08] focus:ring-4 focus:ring-white/10"
                    placeholder="Ada Lovelace"
                    required
                  />
                </div>

                <div className="space-y-2.5">
                  <label htmlFor="email" className="block text-sm text-white/72">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/14 bg-white/[0.05] px-4 py-3.5 text-sm text-foreground placeholder:text-white/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition duration-300 focus:border-white/30 focus:bg-white/[0.08] focus:ring-4 focus:ring-white/10"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2.5">
                  <label htmlFor="password" className="block text-sm text-white/72">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-white/14 bg-white/[0.05] px-4 py-3.5 text-sm text-foreground placeholder:text-white/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition duration-300 focus:border-white/30 focus:bg-white/[0.08] focus:ring-4 focus:ring-white/10"
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div className="flex flex-col gap-3 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-3 text-sm text-white/62">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/25 bg-transparent accent-white"
                      required
                    />
                    I understand this creates a GreenGauge account for the current prototype
                  </label>
                </div>

                {error ? (
                  <p className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                    {error}
                  </p>
                ) : null}

                {message ? (
                  <p className="rounded-2xl border border-emerald-200/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-50">
                    {message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/16 bg-white px-6 py-3.5 text-sm font-medium text-black shadow-[0_18px_44px_rgba(0,0,0,0.22)] transition-all duration-300 hover:translate-y-[-1px] hover:bg-white/92 focus:outline-none focus:ring-4 focus:ring-white/18 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Creating account...' : 'Create your account'}
                </button>
              </form>

              <div className="mt-6 border-t border-white/10 pt-5 text-center text-sm text-white/54">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-white/76 no-underline transition-colors hover:text-foreground"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </section>
          </div>
        </div>
      </main>
    </>
  );
}
