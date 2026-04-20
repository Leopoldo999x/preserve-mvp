"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, Plus, ShoppingBasket } from "lucide-react";
import { useAppState } from "@/components/providers/app-state";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { categoryLabel, priorityLabel, sourceLabel } from "@/lib/utils";

export default function GroceryPage() {
  const { groceryList, addManualGroceryItem, removeGroceryItem, addLowStockItemsToGrocery } = useAppState();
  const [name, setName] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;
    addManualGroceryItem({
      name,
      category: "Manual",
      quantity: 1,
      unit: "pezzo",
      priority: "normal"
    });
    setName("");
  };

  return (
    <div className="space-y-6 pb-8">
      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard>
          <SectionHeading
            eyebrow="Flusso spesa"
            title="Un'unica lista per scorte basse, ingredienti mancanti e prodotti ricorrenti"
            description="Questa simulazione mostra come Preserve riduca il tempo di pianificazione ed eviti acquisti duplicati."
            action={
              <button
                onClick={addLowStockItemsToGrocery}
                className="rounded-2xl bg-preserve-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0f271f]"
              >
                Aggiungi scorte basse
              </button>
            }
          />

          <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              className="flex-1 rounded-2xl border border-[#D8E5DC] bg-[#FBFDFC] px-4 py-3 text-preserve-ink outline-none transition focus:border-preserve-leaf"
              placeholder="Aggiungi un articolo alla lista"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-preserve-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0f271f]">
              <Plus className="h-4 w-4" />
              Aggiungi
            </button>
          </form>

          <div className="mt-5 space-y-3">
            {groceryList.length === 0 ? (
              <EmptyState
                title="La tua lista della spesa e' vuota"
                description="Aggiungi prodotti manualmente oppure lascia che Preserve sposti qui in automatico gli articoli con scorte basse."
              />
            ) : (
              groceryList.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 rounded-[24px] border border-[#E8EEE9] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-preserve-ink">{item.name}</p>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.priority === "high" ? "bg-[#FFF0EE] text-[#B24034]" : "bg-[#EDF5FF] text-[#255D9D]"}`}>
                        {priorityLabel(item.priority)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-preserve-slate">
                      {item.quantity} {item.unit} • {categoryLabel(item.category)} • via {sourceLabel(item.source)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeGroceryItem(item.id)}
                    className="rounded-2xl border border-[#D8E5DC] px-4 py-3 text-sm font-medium text-preserve-ink transition hover:bg-[#F5FAF6]"
                  >
                    Segna come acquistato
                  </button>
                </div>
              ))
            )}
          </div>
        </SurfaceCard>

        <div className="space-y-4">
          <SurfaceCard className="bg-gradient-to-br from-[#FFF8EF] to-white">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#A85F00]">
              <ShoppingBasket className="h-4 w-4" />
              Riordino smart
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-preserve-ink">Automazione premium in arrivo</h3>
            <p className="mt-3 text-sm leading-6 text-preserve-slate">
              Il riordino predittivo imparera' i ritmi di consumo della casa, i prezzi dei retailer e le finestre migliori di consegna.
            </p>
            <div className="mt-5 rounded-[24px] border border-white/70 bg-white/90 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-preserve-ink">
                <LockKeyhole className="h-4 w-4 text-[#A85F00]" />
                Anteprima funzione bloccata
              </div>
              <p className="mt-2 text-sm leading-6 text-preserve-slate">
                Miglior negozio suggerito, prezzi dinamici e riordino in un tocco sono gia' segnati come prossimamente disponibili.
              </p>
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-preserve-leaf">Integrazioni retailer</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-preserve-ink">Prossimamente</h3>
            <p className="mt-3 text-sm leading-6 text-preserve-slate">
              Preserve e' progettato per collegarsi a retailer e delivery, ma nell'MVP resta una sezione futura pensata per il racconto demo.
            </p>
          </SurfaceCard>
        </div>
      </section>
    </div>
  );
}
