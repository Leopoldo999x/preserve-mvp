"use client";

import { useState } from "react";
import { BellRing, SlidersHorizontal } from "lucide-react";
import { useAppState } from "@/components/providers/app-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { UserPreferences } from "@/lib/types";
import { dietPreferenceLabel, fitnessGoalLabel, householdTypeLabel } from "@/lib/utils";

const options = {
  dietPreference: ["balanced", "high protein", "vegetarian", "low carb"],
  fitnessGoal: ["lose weight", "maintain", "build muscle"],
  householdType: ["single", "couple", "family", "student"]
} as const;

export default function SettingsPage() {
  const { preferences, updatePreferences } = useAppState();
  const [draft, setDraft] = useState<UserPreferences>(preferences);

  return (
    <div className="space-y-6 pb-8">
      <SurfaceCard className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            eyebrow="Impostazioni"
            title="Personalizza il modo in cui Preserve suggerisce, ricorda e assegna priorita'"
            description="Questi controlli simulano una pianificazione sensibile al profilo, tra ricette, scadenze e comportamento di acquisto."
          />
          <div className="mt-5 space-y-4">
            <div className="rounded-[24px] border border-[#E8EEE9] bg-[#FBFDFC] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-preserve-ink">
                <SlidersHorizontal className="h-4 w-4 text-preserve-leaf" />
                Logica di raccomandazione
              </div>
              <p className="mt-2 text-sm leading-6 text-preserve-slate">
                Ordine delle ricette, promemoria spesa e messaggi in dashboard si adattano alla tua casa e ai tuoi obiettivi.
              </p>
            </div>
            <div className="rounded-[24px] border border-[#E8EEE9] bg-[#FBFDFC] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-preserve-ink">
                <BellRing className="h-4 w-4 text-preserve-leaf" />
                Modello notifiche
              </div>
              <p className="mt-2 text-sm leading-6 text-preserve-slate">
                Avvisi di scadenza e promemoria spesa possono essere regolati per studente, famiglia o profilo orientato al fitness.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#E8EEE9] bg-[#FBFDFC] p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-preserve-slate">
              Preferenza alimentare
              <select
                className="mt-2 w-full rounded-2xl border border-[#D8E5DC] bg-white px-4 py-3 text-preserve-ink outline-none transition focus:border-preserve-leaf"
                value={draft.dietPreference}
                onChange={(event) => setDraft((current) => ({ ...current, dietPreference: event.target.value as UserPreferences["dietPreference"] }))}
              >
                {options.dietPreference.map((option) => (
                  <option key={option} value={option}>
                    {dietPreferenceLabel(option)}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm text-preserve-slate">
              Obiettivo fitness
              <select
                className="mt-2 w-full rounded-2xl border border-[#D8E5DC] bg-white px-4 py-3 text-preserve-ink outline-none transition focus:border-preserve-leaf"
                value={draft.fitnessGoal}
                onChange={(event) => setDraft((current) => ({ ...current, fitnessGoal: event.target.value as UserPreferences["fitnessGoal"] }))}
              >
                {options.fitnessGoal.map((option) => (
                  <option key={option} value={option}>
                    {fitnessGoalLabel(option)}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm text-preserve-slate md:col-span-2">
              Nucleo domestico
              <select
                className="mt-2 w-full rounded-2xl border border-[#D8E5DC] bg-white px-4 py-3 text-preserve-ink outline-none transition focus:border-preserve-leaf"
                value={draft.householdType}
                onChange={(event) => setDraft((current) => ({ ...current, householdType: event.target.value as UserPreferences["householdType"] }))}
              >
                {options.householdType.map((option) => (
                  <option key={option} value={option}>
                    {householdTypeLabel(option)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 space-y-3">
            {[
              { key: "push", label: "Notifiche push" },
              { key: "email", label: "Riepiloghi email" },
              { key: "groceryReminders", label: "Promemoria spesa" },
              { key: "expiryAlerts", label: "Avvisi di scadenza" }
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between gap-4 rounded-[24px] border border-[#E8EEE9] bg-white px-4 py-4">
                <span className="text-sm font-medium text-preserve-ink">{item.label}</span>
                <input
                  type="checkbox"
                  checked={draft.notifications[item.key as keyof UserPreferences["notifications"]]}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      notifications: {
                        ...current.notifications,
                        [item.key]: event.target.checked
                      }
                    }))
                  }
                  className="h-5 w-5 shrink-0 accent-[#0F8A5F]"
                />
              </label>
            ))}
          </div>

          <button
            onClick={() => updatePreferences(draft)}
            className="mt-5 w-full rounded-2xl bg-preserve-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0f271f]"
          >
            Salva impostazioni
          </button>
        </div>
      </SurfaceCard>
    </div>
  );
}
