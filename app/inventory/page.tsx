"use client";

import { FormEvent, useMemo, useState } from "react";
import { Camera, Mic, Plus, Sparkles } from "lucide-react";
import { InventoryRow } from "@/components/inventory/inventory-row";
import { useAppState } from "@/components/providers/app-state";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { InventoryFilter, InventoryItem } from "@/lib/types";
import { categoryLabel, getInventoryStatus, isLowStock, sourceLabel } from "@/lib/utils";

const filterLabels: Array<{ key: InventoryFilter; label: string }> = [
  { key: "all", label: "Tutti" },
  { key: "expiring", label: "In scadenza" },
  { key: "expired", label: "Scaduto" },
  { key: "low-stock", label: "Scorte basse" }
];

const categoryOptions: InventoryItem["category"][] = ["Produce", "Protein", "Dairy", "Pantry", "Frozen", "Snacks", "Beverages"];
const sourceOptions: InventoryItem["source"][] = ["manual", "scan", "voice"];

const initialForm: Omit<InventoryItem, "id"> = {
  name: "",
  category: "Produce",
  quantity: 1,
  unit: "pz",
  expirationDate: "2026-04-25",
  calories: 100,
  protein: 5,
  carbs: 10,
  fats: 3,
  lowStockThreshold: 1,
  source: "manual"
};

export default function InventoryPage() {
  const { inventory, inventoryFilter, setInventoryFilter, addInventoryItem, consumeInventoryItem, reduceInventoryItem, addManualGroceryItem } =
    useAppState();
  const [form, setForm] = useState(initialForm);

  const filtered = useMemo(() => {
    switch (inventoryFilter) {
      case "expiring":
        return inventory.filter((item) => getInventoryStatus(item) === "expiring");
      case "expired":
        return inventory.filter((item) => getInventoryStatus(item) === "expired");
      case "low-stock":
        return inventory.filter(isLowStock);
      default:
        return inventory;
    }
  }, [inventory, inventoryFilter]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addInventoryItem(form);
    setForm(initialForm);
  };

  return (
    <div className="space-y-6 pb-8">
      <SurfaceCard className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div>
          <SectionHeading
            eyebrow="Inventario smart"
            title="Acquisisci gli alimenti nel modo in cui le persone si muovono davvero"
            description="L'inserimento manuale e' sempre disponibile, mentre scansione e voce simulano un'esperienza MVP realistica e pronta da mostrare."
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button className="rounded-[24px] border border-[#D8E5DC] bg-[#F9FBF8] p-4 text-left transition hover:bg-white">
              <Camera className="h-5 w-5 text-preserve.leaf" />
              <p className="mt-3 font-medium text-preserve.ink">Simula scansione fotocamera</p>
              <p className="mt-1 text-sm leading-6 text-preserve.slate">Riconosci etichette e date di scadenza con un flusso visivo rapido e intuitivo.</p>
            </button>
            <button className="rounded-[24px] border border-[#D8E5DC] bg-[#FFF7EA] p-4 text-left transition hover:bg-white">
              <Mic className="h-5 w-5 text-[#A85F00]" />
              <p className="mt-3 font-medium text-preserve.ink">Simula input vocale</p>
              <p className="mt-1 text-sm leading-6 text-preserve.slate">"Aggiungi due avocado e latte di mandorla" diventa inventario strutturato in pochi secondi.</p>
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-3 rounded-[28px] border border-[#E8EEE9] bg-[#FBFDFC] p-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-preserve.leaf">Aggiungi articolo manualmente</p>
          </div>
          {[
            { label: "Nome", key: "name", type: "text" },
            { label: "Quantita", key: "quantity", type: "number" },
            { label: "Unita", key: "unit", type: "text" },
            { label: "Scadenza", key: "expirationDate", type: "date" },
            { label: "Calorie", key: "calories", type: "number" },
            { label: "Proteine", key: "protein", type: "number" },
            { label: "Carboidrati", key: "carbs", type: "number" },
            { label: "Grassi", key: "fats", type: "number" },
            { label: "Soglia scorte basse", key: "lowStockThreshold", type: "number" }
          ].map((field) => (
            <label key={field.key} className="text-sm text-preserve.slate">
              {field.label}
              <input
                required={field.key === "name"}
                className="mt-2 w-full rounded-2xl border border-[#D8E5DC] bg-white px-4 py-3 text-preserve.ink outline-none transition focus:border-preserve.leaf"
                type={field.type}
                value={String(form[field.key as keyof typeof form])}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    [field.key]: field.type === "number" ? Number(event.target.value) : event.target.value
                  }))
                }
              />
            </label>
          ))}
          <label className="text-sm text-preserve.slate">
            Categoria
            <select
              className="mt-2 w-full rounded-2xl border border-[#D8E5DC] bg-white px-4 py-3 text-preserve.ink outline-none transition focus:border-preserve.leaf"
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as InventoryItem["category"] }))}
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {categoryLabel(category)}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-preserve.slate">
            Origine
            <select
              className="mt-2 w-full rounded-2xl border border-[#D8E5DC] bg-white px-4 py-3 text-preserve.ink outline-none transition focus:border-preserve.leaf"
              value={form.source}
              onChange={(event) => setForm((current) => ({ ...current, source: event.target.value as InventoryItem["source"] }))}
            >
              {sourceOptions.map((source) => (
                <option key={source} value={source}>
                  {sourceLabel(source)}
                </option>
              ))}
            </select>
          </label>
          <button className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-preserve.ink px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0f271f]">
            <Plus className="h-4 w-4" />
            Aggiungi all'inventario
          </button>
        </form>
      </SurfaceCard>

      <SurfaceCard>
        <SectionHeading
          eyebrow="Vista inventario"
          title="Controlla freschezza, urgenza e rischio di scorte basse"
          description="La logica dinamica delle scadenze si aggiorna sulla data corrente, cosi l'MVP resta sempre realistico."
          action={
            <div className="flex flex-wrap gap-2">
              {filterLabels.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setInventoryFilter(filter.key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    inventoryFilter === filter.key ? "bg-preserve.ink text-white" : "bg-[#F3F7F2] text-preserve.slate hover:bg-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          }
        />

        <div className="mt-5 space-y-3">
          {filtered.length === 0 ? (
            <EmptyState
              title="Nessun articolo in questa vista"
              description="Cambia filtro oppure aggiungi un nuovo alimento per mantenere attiva l'intelligenza domestica."
              action={
                <button
                  onClick={() => setInventoryFilter("all")}
                  className="rounded-2xl bg-preserve.ink px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0f271f]"
                >
                  Reimposta filtro
                </button>
              }
            />
          ) : (
            filtered.map((item) => (
              <InventoryRow
                key={item.id}
                item={item}
                onConsume={() => consumeInventoryItem(item.id)}
                onReduce={() => reduceInventoryItem(item.id)}
                onQueue={() =>
                  addManualGroceryItem({
                    name: item.name,
                    category: item.category,
                    quantity: 1,
                    unit: item.unit,
                    priority: "high"
                  })
                }
              />
            ))
          )}
        </div>

        <div className="mt-5 rounded-[24px] border border-dashed border-[#D8E5DC] bg-[#F9FBF8] p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-preserve.ink">
            <Sparkles className="h-4 w-4 text-preserve.leaf" />
            Roadmap scaffale smart
          </div>
          <p className="mt-2 text-sm leading-6 text-preserve.slate">
            Le prossime iterazioni potranno rilevare la posizione nel frigo, importare scontrini e suggerire automaticamente le scadenze in base allo storico.
          </p>
        </div>
      </SurfaceCard>
    </div>
  );
}
