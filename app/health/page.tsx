"use client";

import { Apple, Dumbbell, Flame, Target } from "lucide-react";
import { NutritionTrendChart } from "@/components/charts/progress-chart";
import { useAppState } from "@/components/providers/app-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { nutritionTrend } from "@/lib/mock-data";
import { dietPreferenceLabel, fitnessGoalLabel } from "@/lib/utils";

const ProgressBar = ({ value, goal, color }: { value: number; goal: number; color: string }) => (
  <div>
    <div className="mb-2 flex items-center justify-between text-sm">
      <span className="text-preserve.slate">
        {value} / {goal}
      </span>
      <span className="font-medium text-preserve.ink">{Math.round((value / goal) * 100)}%</span>
    </div>
    <div className="h-3 rounded-full bg-[#EAF0EB]">
      <div className={`h-3 rounded-full ${color}`} style={{ width: `${Math.min((value / goal) * 100, 100)}%` }} />
    </div>
  </div>
);

export default function HealthPage() {
  const { health, preferences, recipes } = useAppState();

  return (
    <div className="space-y-6 pb-8">
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard className="bg-gradient-to-br from-white via-[#F7FBF8] to-[#EEF8F1]">
          <SectionHeading
            eyebrow="Simulazione Apple Health"
            title="Guida nutrizionale collegata al vero inventario domestico"
            description="Questa pagina simula come Preserve possa trasformare dati wearable e nutrizionali in suggerimenti pasto concreti."
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-[#D8E5DC] bg-white p-5">
              <div className="flex items-center gap-2 text-sm text-preserve.slate">
                <Apple className="h-4 w-4 text-preserve.leaf" />
                Apple Health / Apple Watch
              </div>
              <p className="mt-3 text-xl font-medium text-preserve.ink">{health.watchSyncStatus}</p>
              <p className="mt-2 text-sm leading-6 text-preserve.slate">
                Preserve usa questo flusso per stimare fabbisogno energetico, recupero e momento ideale per i pasti.
              </p>
            </div>
            <div className="rounded-[24px] border border-[#D8E5DC] bg-white p-5">
              <div className="flex items-center gap-2 text-sm text-preserve.slate">
                <Target className="h-4 w-4 text-preserve.leaf" />
                Obiettivo attivo
              </div>
              <p className="mt-3 text-xl font-medium text-preserve.ink">{fitnessGoalLabel(preferences.fitnessGoal)}</p>
              <p className="mt-2 text-sm leading-6 text-preserve.slate">
                I suggerimenti sono tarati su un profilo alimentare {dietPreferenceLabel(preferences.dietPreference).toLowerCase()}.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-[#E8EEE9] bg-white p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-preserve.ink">
                <Flame className="h-4 w-4 text-preserve.amber" />
                Energia giornaliera
              </div>
              <p className="mt-3 font-display text-4xl font-semibold tracking-tight text-preserve.ink">{health.caloriesConsumed} kcal</p>
              <div className="mt-4">
                <ProgressBar value={health.caloriesConsumed} goal={health.calorieGoal} color="bg-preserve.amber" />
              </div>
            </div>

            <div className="rounded-[24px] border border-[#E8EEE9] bg-white p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-preserve.ink">
                <Dumbbell className="h-4 w-4 text-preserve.leaf" />
                Avanzamento macro
              </div>
              <div className="mt-4 space-y-4">
                <ProgressBar value={health.protein} goal={health.proteinGoal} color="bg-preserve.leaf" />
                <ProgressBar value={health.carbs} goal={health.carbsGoal} color="bg-[#76A9FF]" />
                <ProgressBar value={health.fats} goal={health.fatsGoal} color="bg-[#EF6A5B]" />
              </div>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-preserve.leaf">Pasti suggeriti</p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-preserve.ink">Consigliati per oggi</h3>
          <div className="mt-5 space-y-3">
            {recipes.slice(0, 3).map((recipe) => (
              <div key={recipe.id} className="rounded-[24px] border border-[#E8EEE9] bg-[#FBFDFC] p-4">
                <p className="font-medium text-preserve.ink">{recipe.title}</p>
                <p className="mt-1 text-sm text-preserve.slate">
                  {recipe.calories} kcal • {recipe.protein}g proteine • {recipe.cookingTime} min
                </p>
                <p className="mt-2 text-sm leading-6 text-preserve.slate">
                  {recipe.tags.includes("high-protein")
                    ? "Supporta recupero e obiettivi di crescita muscolare."
                    : "Si inserisce bene in una routine nutrizionale piu' leggera e bilanciata."}
                </p>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <NutritionTrendChart data={nutritionTrend} />
    </div>
  );
}
