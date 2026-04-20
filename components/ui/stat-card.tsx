import { ReactNode } from "react";
import { SurfaceCard } from "@/components/ui/surface-card";

export const StatCard = ({
  label,
  value,
  icon,
  hint
}: {
  label: string;
  value: string;
  icon: ReactNode;
  hint: string;
}) => (
  <SurfaceCard className="relative overflow-hidden">
    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-preserve-leaf via-[#49B88D] to-preserve-amber" />
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-preserve-slate">{label}</p>
        <p className="mt-3 font-display text-4xl font-semibold tracking-tight text-preserve-ink">{value}</p>
        <p className="mt-2 text-sm text-preserve-slate">{hint}</p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-preserve-mint text-preserve-leaf">{icon}</div>
    </div>
  </SurfaceCard>
);
