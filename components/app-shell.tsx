"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChefHat, CircleUserRound, HeartPulse, House, Leaf, Refrigerator, Settings2, ShoppingCart, Sparkles } from "lucide-react";
import clsx from "clsx";
import { ReactNode } from "react";
import { useAppState } from "@/components/providers/app-state";
import { dietPreferenceLabel, fitnessGoalLabel, householdTypeLabel } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Dashboard", icon: House },
  { href: "/inventory", label: "Inventario", icon: Refrigerator },
  { href: "/recipes", label: "Ricette", icon: ChefHat },
  { href: "/grocery", label: "Lista della spesa", icon: ShoppingCart },
  { href: "/health", label: "Salute e nutrizione", icon: HeartPulse },
  { href: "/settings", label: "Impostazioni", icon: Settings2 }
];

export const AppShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { notifications, preferences } = useAppState();

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:px-6">
        <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-[320px] shrink-0 flex-col rounded-[32px] border border-white/70 bg-white/75 p-5 shadow-soft backdrop-blur xl:flex">
          <div className="rounded-[28px] bg-gradient-to-br from-preserve.ink via-[#194b3b] to-preserve.leaf p-6 text-white shadow-float">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/16">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight">Preserve</p>
                <p className="text-sm text-white/72">Cibo smart. Tempo smart. Meno sprechi.</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-white/86">
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-white/60">Nucleo domestico</p>
                <p className="mt-1 font-medium">{householdTypeLabel(preferences.householdType)}</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-white/60">Obiettivo attivo</p>
                <p className="mt-1 font-medium">{fitnessGoalLabel(preferences.fitnessGoal)}</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            {navigation.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    active
                      ? "bg-preserve.mint text-preserve.ink shadow-sm"
                      : "text-preserve.slate hover:bg-white hover:text-preserve.ink"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-[28px] border border-[#D7EBDD] bg-[#F7FBF8] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-preserve.ink">
              <Sparkles className="h-4 w-4 text-preserve.leaf" />
              Preserve Plus
            </div>
            <p className="text-sm leading-6 text-preserve.slate">
              Sblocca riordini predittivi, integrazioni con retailer e sincronizzazione con frigoriferi smart per la prossima fase demo.
            </p>
            <button className="mt-4 w-full rounded-2xl bg-preserve.ink px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0f271f]">
              Anteprima premium
            </button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col gap-6">
          <header className="sticky top-4 z-20 rounded-[28px] border border-white/70 bg-white/75 px-4 py-4 shadow-soft backdrop-blur lg:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-preserve.leaf">
                  <Leaf className="h-4 w-4" />
                  Intelligenza domestica Preserve
                </div>
                <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-preserve.ink">
                  Riduci gli sprechi mantenendo i pasti in linea con i tuoi obiettivi.
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-2xl border border-[#DCE6DF] bg-[#F7FAF7] px-4 py-3 text-sm">
                  <Bell className="h-4 w-4 text-preserve.leaf" />
                  <span className="font-medium text-preserve.ink">{notifications.length} notifiche attive</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-preserve.ink px-4 py-3 text-white">
                  <CircleUserRound className="h-5 w-5 text-white/82" />
                  <div className="text-sm">
                    <p className="font-medium">Ari Romano</p>
                    <p className="text-white/70">{dietPreferenceLabel(preferences.dietPreference)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto xl:hidden">
              {navigation.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition",
                      active ? "bg-preserve.ink text-white" : "bg-[#F3F7F2] text-preserve.slate hover:bg-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};
