import { ReactNode } from "react";
import { SurfaceCard } from "@/components/ui/surface-card";

export const EmptyState = ({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <SurfaceCard className="border-dashed border-[#D8E5DC] bg-[#FBFDFC] text-center">
    <h3 className="font-display text-2xl font-semibold tracking-tight text-preserve-ink">{title}</h3>
    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-preserve-slate">{description}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </SurfaceCard>
);
