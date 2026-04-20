"use client";

import { ArrowRight, Bell, BrainCircuit, ChartPie, Flame, Leaf, PackageSearch, ShieldCheck, ShoppingCart } from "lucide-react";
import { useAppState } from "@/components/providers/app-state";
import { NutritionTrendChart, WasteReductionChart } from "@/components/charts/progress-chart";
import { NotificationCard } from "@/components/ui/notification-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { SurfaceCard } from "@/components/ui/surface-card";
import { nutritionTrend, wasteTrend } from "@/lib/mock-data";
import { goalLabel } from "@/lib/utils";

export default function DashboardPage() {
  const { stats, notifications, recipes, addLowStockItemsToGrocery, preferences, health } = useAppState();

  return (
    <div className="space-y-6 pb-8">
      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <SurfaceCard className="overflow-hidden bg-gradient-to-br from-preserve-ink via-[#194b3b] to-preserve-leaf p-0 text-white">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Motore intelligente Preserve</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight">
                Trasforma cio' che hai gia' in casa in pasti migliori, decisioni piu' rapide e meno sprechi.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/78">
                Preserve unisce controllo delle scadenze, suggerimenti di ricette, lista della spesa e guida nutrizionale in un flusso semplice e moderno.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-preserve-ink transition hover:bg-[#f3f6f4]">
                  Avvia scansione smart
                </button>
                <button className="rounded-2xl border border-white/18 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/16">
                  Guarda il percorso demo
                </button>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[24px] border border-white/12 bg-white/10 p-4">
                <div className="flex items-center gap-2 text-sm text-white/74">
                  <ChartPie className="h-4 w-4" />
                  Impatto settimanale
                </div>
                <p className="mt-3 font-display text-4xl font-semibold">{stats.estimatedWasteAvoided}%</p>
                <p className="mt-2 text-sm text-white/74">Stima dello spreco evitato negli ultimi 30 giorni.</p>
              </div>
              <div className="rounded-[24px] border border-white/12 bg-white/10 p-4">
                <div className="flex items-center gap-2 text-sm text-white/74">
                  <BrainCircuit className="h-4 w-4" />
                  Allineamento obiettivi
                </div>
                <p className="mt-3 text-lg font-medium">{goalLabel(preferences)}</p>
                <p className="mt-2 text-sm text-white/74">{health.watchSyncStatus}</p>
              </div>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard className="bg-[#F9FBF7]">
          <SectionHeading
            eyebrow="Notifiche"
            title="Centro azioni"
            description="Le azioni piu' importanti per ridurre gli sprechi e tenere i pasti sulla giusta rotta."
          />
          <div className="mt-5 space-y-3">
            {notifications.slice(0, 3).map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Totale articoli" value={String(stats.totalItems)} hint="Tra frigo, dispensa ed essenziali." icon={<PackageSearch className="h-6 w-6" />} />
        <StatCard label="In scadenza questa settimana" value={String(stats.expiringThisWeek)} hint="Intercettali prima che diventino spreco." icon={<Bell className="h-6 w-6" />} />
        <StatCard label="Spreco evitato" value={`${stats.estimatedWasteAvoided}%`} hint="Un indicatore di progresso del mese corrente." icon={<Leaf className="h-6 w-6" />} />
        <StatCard label="Sintesi nutrizionale" value={`${stats.macros.protein}g`} hint="Proteine disponibili dagli articoli piu' utili." icon={<Flame className="h-6 w-6" />} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <WasteReductionChart data={wasteTrend} />
        <SurfaceCard>
          <SectionHeading
            eyebrow="Suggerimenti smart"
            title="Cucina partendo da cio' che hai gia'"
            description="Le ricette sono ordinate per sovrapposizione ingredienti, rapidita' e compatibilita' con i tuoi obiettivi."
          />
          <div className="mt-5 space-y-4">
            {recipes.slice(0, 3).map((recipe) => (
              <div key={recipe.id} className="rounded-[24px] border border-[#E8EEE9] bg-[#FBFDFC] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-preserve-ink">{recipe.title}</p>
                    <p className="mt-1 text-sm text-preserve-slate">
                      {recipe.match.matched.length}/{recipe.ingredients.length} ingredienti gia' disponibili
                    </p>
                  </div>
                  <span className="rounded-full bg-preserve-mint px-3 py-1 text-xs font-semibold text-preserve-leaf">
                    Compatibilita {(recipe.match.ratio * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr_0.8fr]">
        <NutritionTrendChart data={nutritionTrend} />
        <SurfaceCard>
          <SectionHeading
            eyebrow="Riordino smart"
            title="Prepara automaticamente la prossima spesa"
            description="Segnali di scorte basse e ingredienti mancanti alimentano una lista pronta quando serve."
            action={
              <button
                onClick={addLowStockItemsToGrocery}
                className="rounded-2xl bg-preserve-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0f271f]"
              >
                Aggiungi scorte basse
              </button>
            }
          />
          <div className="mt-5 space-y-4">
            <div className="rounded-[24px] border border-[#E8EEE9] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-preserve-ink">
                <ShoppingCart className="h-4 w-4 text-preserve-leaf" />
                Automazione spesa
              </div>
              <p className="mt-2 text-sm leading-6 text-preserve-slate">
                Ingredienti mancanti, scorte basse e abitudini domestiche confluiscono in un'unica lista della spesa.
              </p>
            </div>
            <div className="rounded-[24px] border border-dashed border-[#D8E5DC] bg-[#F9FBF8] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-preserve-ink">
                <ShieldCheck className="h-4 w-4 text-preserve-amber" />
                Concept futuro: frigorifero smart
              </div>
              <p className="mt-2 text-sm leading-6 text-preserve-slate">
                Rilevamento sugli scaffali, integrazione con retailer e riordino predittivo sono gia' pronti come prossima evoluzione del prodotto.
              </p>
            </div>
          </div>
        </SurfaceCard>
        <SurfaceCard className="bg-gradient-to-br from-[#FFF7EA] via-white to-[#FFF1EA]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A85F00]">Anteprima onboarding</p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-preserve-ink">Preserve diventa utile in meno di 60 secondi</h3>
          <div className="mt-5 space-y-3">
            {[
              "Collega obiettivi e tipologia di nucleo domestico",
              "Scansiona alcuni alimenti base dal frigo",
              "Ricevi subito un suggerimento su cosa cucinare",
              "Genera automaticamente la prossima lista della spesa"
            ].map((step, index) => (
              <div key={step} className="flex items-start gap-3 rounded-2xl bg-white/80 p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-preserve-ink text-sm font-medium text-white">{index + 1}</div>
                <p className="text-sm leading-6 text-preserve-slate">{step}</p>
              </div>
            ))}
          </div>
          <button className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-preserve-ink">
            Scopri l'intero percorso di onboarding
            <ArrowRight className="h-4 w-4" />
          </button>
        </SurfaceCard>
      </section>
    </div>
  );
}
