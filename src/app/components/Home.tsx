import { Link } from 'react-router';

export function Home() {
  return (
    <>
      <header>
        <nav className="relative z-50 flex w-full items-center justify-between px-12 py-10">
          <Link
            to="/"
            className="relative z-10 shrink-0 text-3xl tracking-[-0.03em] text-foreground no-underline sm:text-[2rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            GreenGauge
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
            <a href="#" className="text-sm text-foreground transition-colors">
              Home
            </a>
            <a href="#" className="text-sm text-white/72 transition-colors hover:text-foreground">
              Studio
            </a>
            <a href="#" className="text-sm text-white/72 transition-colors hover:text-foreground">
              About
            </a>
            <a href="#" className="text-sm text-white/72 transition-colors hover:text-foreground">
              Journal
            </a>
            <a href="#" className="text-sm text-white/72 transition-colors hover:text-foreground">
              Reach Us
            </a>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex rounded-full border border-white/24 bg-white/[0.055] px-6 py-2.5 text-sm font-medium text-foreground no-underline shadow-[0_8px_24px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.085]"
            >
              Enter Platform
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-start px-6 pt-16 pb-60 text-center lg:px-10">
        <div className="max-w-[72rem]">
          <h1
            className="animate-fade-rise mx-auto text-4xl leading-[0.9] tracking-[-0.04em] text-foreground sm:text-6xl md:whitespace-nowrap md:text-[5.9rem]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            See the <em className="not-italic text-white/72">climate risk</em> your portfolio carries
          </h1>

          <p className="animate-fade-rise-delay mx-auto mt-6 max-w-4xl text-base leading-relaxed text-white/68 sm:text-lg">
            GreenGauge turns a portfolio into a quiet, evidence-led x-ray — surfacing financed emissions,
            transition pressure, and the holdings shaping your environmental exposure before the risk feels obvious.
          </p>

          <div className="animate-fade-rise-delay-2 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/login"
              className="liquid-glass inline-flex min-w-[15.5rem] justify-center rounded-full bg-white/[0.1] px-14 py-5 text-base font-medium text-foreground no-underline shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition-all duration-300 hover:scale-[1.03] hover:bg-white/[0.14]"
            >
              Enter GreenGauge
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
