import clsx from "clsx";
import { ReactNode } from "react";

export const SurfaceCard = ({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) => (
  <section className={clsx("rounded-[28px] border border-white/80 bg-white/80 p-5 shadow-soft backdrop-blur", className)}>
    {children}
  </section>
);
