"use client";

import { RecipeCard } from "@/components/recipes/recipe-card";
import { useAppState } from "@/components/providers/app-state";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { RecipeTag } from "@/lib/types";
import { dietPreferenceLabel } from "@/lib/utils";

const tags: Array<{ key: RecipeTag | "all"; label: string }> = [
  { key: "all", label: "Tutte" },
  { key: "high-protein", label: "Alto contenuto proteico" },
  { key: "low-calorie", label: "Poche calorie" },
  { key: "vegetarian", label: "Vegetariano" },
  { key: "quick", label: "Pasti veloci" }
];

export default function RecipesPage() {
  const { recipes, recipeFilter, setRecipeFilter, addMissingIngredientsToGrocery, preferences } = useAppState();

  return (
    <div className="space-y-6 pb-8">
      <SurfaceCard className="bg-gradient-to-br from-white via-[#F7FBF8] to-[#EEF8F1]">
        <SectionHeading
          eyebrow="Ricette personalizzate"
          title="Suggerimenti costruiti intorno a cio' che hai in casa"
          description={`Preserve da' priorita' agli ingredienti gia' disponibili e adatta i suggerimenti a un profilo alimentare ${dietPreferenceLabel(preferences.dietPreference).toLowerCase()}.`}
          action={
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.key}
                  onClick={() => setRecipeFilter(tag.key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    recipeFilter === tag.key ? "bg-preserve.ink text-white" : "bg-white text-preserve.slate shadow-sm hover:bg-[#F3F7F2]"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          }
        />
      </SurfaceCard>

      {recipes.length === 0 ? (
        <EmptyState
          title="Nessuna ricetta corrisponde a questo filtro"
          description="Prova un altro criterio oppure aggiungi piu' alimenti in dispensa per migliorare il match."
          action={
            <button
              onClick={() => setRecipeFilter("all")}
              className="rounded-2xl bg-preserve.ink px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0f271f]"
            >
              Mostra tutte le ricette
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onAddMissing={() => addMissingIngredientsToGrocery(recipe)} />
          ))}
        </div>
      )}
    </div>
  );
}
