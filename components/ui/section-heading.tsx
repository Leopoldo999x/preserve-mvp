import { ReactNode } from "react";

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.18em] text-preserve-leaf">{eyebrow}</p> : null}
      <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-preserve-ink">{title}</h2>
      {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-preserve-slate">{description}</p> : null}
    </div>
    {action}
  </div>
);
