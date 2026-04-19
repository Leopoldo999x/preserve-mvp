import { Clock3, Dumbbell, ShoppingBasket, Sparkles } from "lucide-react";
import { Recipe } from "@/lib/types";
import { SurfaceCard } from "@/components/ui/surface-card";
import { difficultyLabel, recipeTagLabel } from "@/lib/utils";

type RecipeWithMatch = Recipe & {
  match: {
    matched: string[];
    missing: string[];
    ratio: number;
  };
};

export const RecipeCard = ({
  recipe,
  onAddMissing
}: {
  recipe: RecipeWithMatch;
  onAddMissing: () => void;
}) => (
  <SurfaceCard className="overflow-hidden p-0">
    <div className="border-b border-[#E8EEE9] bg-gradient-to-br from-white via-[#F8FCF8] to-[#EEF8F1] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-preserve.leaf">Compatibilita ricetta {(recipe.match.ratio * 100).toFixed(0)}%</p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-preserve.ink">{recipe.title}</h3>
        </div>
        <div className="rounded-2xl bg-white px-3 py-2 text-sm font-medium text-preserve.ink shadow-sm">{difficultyLabel(recipe.difficulty)}</div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-preserve.slate shadow-sm">
            {recipeTagLabel(tag)}
          </span>
        ))}
      </div>
    </div>

    <div className="space-y-4 p-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-[#F7FBF8] p-4">
          <div className="flex items-center gap-2 text-sm text-preserve.slate">
            <Clock3 className="h-4 w-4 text-preserve.leaf" />
            Tempo di preparazione
          </div>
          <p className="mt-2 font-medium text-preserve.ink">{recipe.cookingTime} min</p>
        </div>
        <div className="rounded-2xl bg-[#F7FBF8] p-4">
          <div className="flex items-center gap-2 text-sm text-preserve.slate">
            <Dumbbell className="h-4 w-4 text-preserve.leaf" />
            Valori nutrizionali
          </div>
          <p className="mt-2 font-medium text-preserve.ink">{recipe.calories} kcal • {recipe.protein}g proteine</p>
        </div>
        <div className="rounded-2xl bg-[#F7FBF8] p-4">
          <div className="flex items-center gap-2 text-sm text-preserve.slate">
            <Sparkles className="h-4 w-4 text-preserve.leaf" />
            Compatibilita obiettivo
          </div>
          <p className="mt-2 font-medium text-preserve.ink">{recipe.tags.includes("high-protein") ? "Ideale per supporto muscolare" : "Perfetta per un equilibrio quotidiano"}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E8EEE9] p-4">
        <p className="text-sm font-medium text-preserve.ink">Ingredienti gia' presenti</p>
        <p className="mt-2 text-sm leading-6 text-preserve.slate">
          {recipe.match.matched.length > 0 ? recipe.match.matched.join(", ") : "Nessuna corrispondenza disponibile al momento."}
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-[#D9E7DD] p-4">
        <p className="text-sm font-medium text-preserve.ink">Ingredienti mancanti</p>
        <p className="mt-2 text-sm leading-6 text-preserve.slate">
          {recipe.match.missing.length > 0 ? recipe.match.missing.join(", ") : "Hai gia' tutto il necessario."}
        </p>
      </div>

      <button
        onClick={onAddMissing}
        className="inline-flex items-center gap-2 rounded-2xl bg-preserve.ink px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0f271f]"
      >
        <ShoppingBasket className="h-4 w-4" />
        Aggiungi ingredienti mancanti
      </button>
    </div>
  </SurfaceCard>
);
