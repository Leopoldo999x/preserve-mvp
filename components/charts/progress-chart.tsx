"use client";

import { SurfaceCard } from "@/components/ui/surface-card";

type WastePoint = {
  week: string;
  wasteAvoided: number;
  mealPrepScore: number;
};

type NutritionPoint = {
  day: string;
  protein: number;
  calories: number;
};

const maxValue = (values: number[]) => Math.max(...values, 1);

export const WasteReductionChart = ({ data }: { data: WastePoint[] }) => {
  const wasteMax = maxValue(data.map((entry) => entry.wasteAvoided));
  const prepMax = maxValue(data.map((entry) => entry.mealPrepScore));

  return (
    <SurfaceCard>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-preserve-leaf">Spreco evitato</p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-preserve-ink">Andamento settimanale della conservazione</h3>
        </div>
        <div className="rounded-2xl bg-[#F4FAF6] px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-preserve-slate">Media</p>
          <p className="mt-1 text-2xl font-semibold text-preserve-ink">
            {Math.round(data.reduce((sum, entry) => sum + entry.wasteAvoided, 0) / data.length)}%
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[24px] border border-[#E8EEE9] bg-[#FBFDFC] p-4">
          <div className="mb-4 flex items-center justify-between text-sm text-preserve-slate">
            <span>Riduzione spreco per settimana</span>
            <span className="rounded-full bg-preserve-mint px-3 py-1 text-xs font-semibold text-preserve-leaf">Ultime 4 settimane</span>
          </div>
          <div className="flex h-[250px] items-end justify-between gap-3">
            {data.map((entry) => (
              <div key={entry.week} className="flex h-full flex-1 flex-col justify-end gap-3">
                <div className="flex flex-1 items-end justify-center">
                  <div
                    className="w-full rounded-t-[18px] bg-gradient-to-t from-preserve-leaf to-[#7ED9A6] transition-all"
                    style={{ height: `${Math.max((entry.wasteAvoided / wasteMax) * 100, 18)}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-preserve-ink">{entry.wasteAvoided}%</p>
                  <p className="text-xs text-preserve-slate">{entry.week}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {data.map((entry) => (
            <div key={entry.week} className="rounded-[24px] border border-[#E8EEE9] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-preserve-ink">{entry.week}</p>
                  <p className="text-xs text-preserve-slate">Indice meal prep</p>
                </div>
                <span className="text-sm font-medium text-preserve-leaf">{entry.mealPrepScore}/100</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[#EEF3EF]">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#FFB34D] to-preserve-leaf"
                  style={{ width: `${Math.max((entry.mealPrepScore / prepMax) * 100, 8)}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-preserve-slate">
                {entry.wasteAvoided >= 30 ? "Settimana molto efficiente, con abitudini ben consolidate." : "C'e' ancora margine per recuperare prodotti a rischio."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SurfaceCard>
  );
};

export const NutritionTrendChart = ({ data }: { data: NutritionPoint[] }) => {
  const proteinMax = maxValue(data.map((entry) => entry.protein));
  const caloriesMax = maxValue(data.map((entry) => entry.calories));

  return (
    <SurfaceCard>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-preserve-leaf">Ritmo nutrizionale</p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-preserve-ink">Costanza tra proteine e calorie</h3>
        </div>
        <div className="flex gap-2 text-xs font-medium">
          <span className="rounded-full bg-[#EAF7F0] px-3 py-2 text-preserve-leaf">Proteine</span>
          <span className="rounded-full bg-[#FFF3E4] px-3 py-2 text-[#B96B09]">Calorie</span>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((entry) => (
          <div key={entry.day} className="rounded-[24px] border border-[#E8EEE9] bg-[#FBFDFC] p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-[96px]">
                <p className="text-sm font-semibold text-preserve-ink">{entry.day}</p>
                <p className="text-xs text-preserve-slate">Andamento giornaliero</p>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-preserve-slate">
                    <span>Proteine</span>
                    <span>{entry.protein} g</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#EEF3EF]">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-preserve-leaf to-[#8BE0B1]"
                      style={{ width: `${Math.max((entry.protein / proteinMax) * 100, 8)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-preserve-slate">
                    <span>Calorie</span>
                    <span>{entry.calories} kcal</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#FFF3E8]">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-[#FFB34D] to-[#FFD28F]"
                      style={{ width: `${Math.max((entry.calories / caloriesMax) * 100, 8)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
};
