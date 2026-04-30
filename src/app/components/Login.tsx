import { type FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { getSafeRedirectPath } from '../../lib/auth-routing';
import { supabase } from '../../lib/supabase';

export function Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTo = getSafeRedirectPath(new URLSearchParams(search).get('redirectTo'));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    void navigate(redirectTo, { replace: true });
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
            <p className="mb-5 text-sm uppercase tracking-[0.28em] text-white/52">
              Secure access
            </p>
            <h1
              className="max-w-3xl text-5xl leading-[0.9] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[5.9rem]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              Return to the lens that keeps climate exposure in view.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/68">
              Sign in to continue your calm, evidence-led read on portfolio emissions, transition
              pressure, and the holdings shaping environmental risk.
            </p>

            <div className="mt-12 hidden max-w-2xl grid-cols-2 gap-5 sm:grid lg:grid-cols-2">
              <div className="liquid-glass rounded-[1.75rem] border border-white/10 px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/45">Signal</p>
                <p
                  className="mt-3 text-[2rem] tracking-[-0.03em] text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Financed emissions
                </p>
              </div>
              <div className="liquid-glass rounded-[1.75rem] border border-white/10 px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/45">Focus</p>
                <p
                  className="mt-3 text-[2rem] tracking-[-0.03em] text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Transition pressure
                </p>
              </div>
            </div>
          </section>

          <section className="animate-fade-rise-delay lg:justify-self-end lg:pt-0">
            <div className="liquid-glass relative overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.06] px-8 py-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] sm:px-8 sm:py-8">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.24em] text-white/46">Member login</p>
                <h2
                  className="mt-4 text-4xl leading-none tracking-[-0.04em] text-foreground sm:text-[3rem]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                >
                  Welcome back
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-white/64">
                  Enter your details to reopen your GreenGauge workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/10 px-4 py-4 text-sm leading-6 text-white/60">
                  Use the email and password you created for this prototype workspace. Account
                  recovery and persistent sign-in controls are not part of the current flow yet.
                </div>

                {error ? (
                  <p className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/16 bg-white px-6 py-3.5 text-sm font-medium text-black shadow-[0_18px_44px_rgba(0,0,0,0.22)] transition-all duration-300 hover:translate-y-[-1px] hover:bg-white/92 focus:outline-none focus:ring-4 focus:ring-white/18 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="mt-6 border-t border-white/10 pt-5 text-center text-sm text-white/54">
                Don&apos;t have an account?{' '}
                <Link
                  to="/signup"
                  className="text-white/76 no-underline transition-colors hover:text-foreground"
                >
                  Sign up
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
