import { Link } from 'react-router';

export function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover brightness-[0.62] contrast-[1.05] saturate-[0.85]"
      >
        <source
          src="https://videos.pexels.com/video-files/16116385/16116385-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="px-4 py-4 sm:px-6 lg:px-8">
          <nav className="liquid-glass relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full bg-white/[0.045] px-5 py-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="shrink-0 text-3xl tracking-tight text-foreground no-underline"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              GreenGauge
            </Link>

            <div className="hidden items-center gap-7 md:flex">
              <a href="#" className="text-sm text-foreground transition-colors">
                Home
              </a>
              <a href="#" className="text-sm text-white/76 transition-colors hover:text-foreground">
                Platform
              </a>
              <a href="#" className="text-sm text-white/76 transition-colors hover:text-foreground">
                Methodology
              </a>
              <a href="#" className="text-sm text-white/76 transition-colors hover:text-foreground">
                Climate Lens
              </a>
              <a href="#" className="text-sm text-white/76 transition-colors hover:text-foreground">
                Journal
              </a>
              <a href="#" className="text-sm text-white/76 transition-colors hover:text-foreground">
                Reach Us
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@greengauge.app"
                className="hidden rounded-full border border-white/15 bg-black/10 px-6 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 hover:scale-[1.03] hover:bg-black/16 sm:inline-flex"
              >
                Contact
              </a>
              <Link
                to="/login"
                className="liquid-glass inline-flex rounded-full bg-white/[0.08] px-6 py-2.5 text-sm font-medium text-foreground no-underline shadow-[0_10px_30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:scale-[1.03] hover:bg-white/[0.11]"
              >
                Enter Platform
              </Link>
            </div>
          </nav>
        </header>

        <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-24 text-center sm:pt-28 lg:px-10 lg:pt-32 lg:pb-24">
          <div className="max-w-[56rem]">
            <div className="animate-fade-rise inline-flex rounded-full border border-white/14 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
              Climate portfolio x-ray
            </div>

            <h1
              className="animate-fade-rise mx-auto mt-8 max-w-[13.5ch] text-5xl leading-[0.91] tracking-[-0.045em] text-foreground sm:text-7xl md:text-[7.25rem]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              See the <em className="not-italic text-white/72">climate story</em>
              <br />
              <em className="not-italic text-white/72">hidden inside</em> your portfolio.
            </h1>

            <p className="animate-fade-rise-delay mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/74 sm:text-lg">
              GreenGauge turns a portfolio into a quiet, evidence-led x-ray — surfacing financed emissions,
              transition pressure, and the holdings shaping your environmental exposure before the risk feels obvious.
            </p>

            <div className="animate-fade-rise-delay-2 mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/login"
                className="liquid-glass inline-flex min-w-[15.5rem] justify-center rounded-full bg-white/[0.1] px-14 py-5 text-base font-medium text-foreground no-underline shadow-[0_14px_40px_rgba(0,0,0,0.18)] transition-all duration-300 hover:scale-[1.03] hover:bg-white/[0.14]"
              >
                Enter GreenGauge
              </Link>
              <a
                href="mailto:hello@greengauge.app?subject=GreenGauge%20Demo"
                className="liquid-glass inline-flex min-w-[15.5rem] cursor-pointer justify-center rounded-full bg-black/12 px-14 py-5 text-base font-medium text-white/92 no-underline shadow-[0_14px_40px_rgba(0,0,0,0.16)] transition-all duration-300 hover:scale-[1.03] hover:bg-black/18"
              >
                Request a Demo
              </a>
            </div>

            <p className="mt-6 text-sm text-white/68">
              Built for climate-conscious allocators, sustainability teams, and investors who want a cleaner read on long-term exposure.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
