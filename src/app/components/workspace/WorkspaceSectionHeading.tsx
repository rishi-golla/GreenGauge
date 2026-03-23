export function WorkspaceSectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title?: string;
  description?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--verdant-mint)] shadow-[0_0_14px_rgba(0,245,212,0.8)]" />
        <p className="text-[0.74rem] uppercase tracking-[0.28em] text-white/68">{eyebrow}</p>
      </div>
      {title ? (
        <h2
          className="mt-4 text-[1.8rem] leading-none tracking-[-0.05em] text-white sm:text-[2.4rem]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
        >
          {title}
        </h2>
      ) : null}
      {description ? <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62 sm:text-base">{description}</p> : null}
    </div>
  );
}

