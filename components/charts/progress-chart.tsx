"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SurfaceCard } from "@/components/ui/surface-card";

export const WasteReductionChart = ({ data }: { data: Array<{ week: string; wasteAvoided: number; mealPrepScore: number }> }) => (
  <SurfaceCard>
    <div className="mb-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-preserve.leaf">Spreco evitato</p>
      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-preserve.ink">Andamento settimanale della conservazione</h3>
    </div>
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E7EEE9" />
          <XAxis dataKey="week" stroke="#7B8B85" />
          <YAxis stroke="#7B8B85" />
          <Tooltip />
          <Bar dataKey="wasteAvoided" fill="#0F8A5F" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </SurfaceCard>
);

export const NutritionTrendChart = ({ data }: { data: Array<{ day: string; protein: number; calories: number }> }) => (
  <SurfaceCard>
    <div className="mb-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-preserve.leaf">Ritmo nutrizionale</p>
      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-preserve.ink">Costanza tra proteine e calorie</h3>
    </div>
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E7EEE9" />
          <XAxis dataKey="day" stroke="#7B8B85" />
          <YAxis stroke="#7B8B85" />
          <Tooltip />
          <Line type="monotone" dataKey="protein" stroke="#0F8A5F" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="calories" stroke="#FFB34D" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </SurfaceCard>
);
