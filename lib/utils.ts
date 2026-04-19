import { GroceryItem, InventoryCategory, InventoryItem, InventorySource, InventoryStatus, NotificationItem, Recipe, RecipeTag, UserPreferences } from "@/lib/types";

export const formatShortDate = (date: string) =>
  new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "short" }).format(new Date(date));

export const daysUntil = (date: string) => {
  const target = new Date(date);
  const today = new Date();
  const utcTarget = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  const utcToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.floor((utcTarget - utcToday) / (1000 * 60 * 60 * 24));
};

export const getInventoryStatus = (item: InventoryItem): InventoryStatus => {
  const remaining = daysUntil(item.expirationDate);
  if (remaining < 0) return "expired";
  if (remaining <= 3) return "expiring";
  return "fresh";
};

export const isLowStock = (item: InventoryItem) => item.quantity <= item.lowStockThreshold;

export const sumMacros = (items: Array<Pick<InventoryItem, "calories" | "protein" | "carbs" | "fats">>) =>
  items.reduce(
    (acc, item) => {
      acc.calories += item.calories;
      acc.protein += item.protein;
      acc.carbs += item.carbs;
      acc.fats += item.fats;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

export const inventoryStatusLabel = (status: InventoryStatus) => {
  if (status === "fresh") return "Fresco";
  if (status === "expiring") return "In scadenza";
  return "Scaduto";
};

export const sourceLabel = (source: InventorySource | GroceryItem["source"]) => {
  if (source === "manual") return "manuale";
  if (source === "scan") return "scansione";
  if (source === "auto") return "automatico";
  return "voce";
};

export const categoryLabel = (category: InventoryCategory | string) =>
  (
    {
      Produce: "Freschi",
      Protein: "Proteine",
      Dairy: "Latticini",
      Pantry: "Dispensa",
      Frozen: "Surgelati",
      Snacks: "Snack",
      Beverages: "Bevande",
      Manual: "Manuale",
      "Recipe need": "Ricetta"
    } as Record<string, string>
  )[category] ?? category;

export const recipeTagLabel = (tag: RecipeTag) =>
  (
    {
      "high-protein": "Alto contenuto proteico",
      "low-calorie": "Poche calorie",
      vegetarian: "Vegetariano",
      quick: "Veloce",
      family: "Per la famiglia"
    } as Record<RecipeTag, string>
  )[tag];

export const difficultyLabel = (difficulty: Recipe["difficulty"]) =>
  (
    {
      Easy: "Facile",
      Medium: "Media",
      Advanced: "Avanzata"
    } as Record<Recipe["difficulty"], string>
  )[difficulty];

export const dietPreferenceLabel = (value: UserPreferences["dietPreference"]) =>
  (
    {
      balanced: "Bilanciata",
      "high protein": "Alta in proteine",
      vegetarian: "Vegetariana",
      "low carb": "Pochi carboidrati"
    } as Record<UserPreferences["dietPreference"], string>
  )[value];

export const fitnessGoalLabel = (value: UserPreferences["fitnessGoal"]) =>
  (
    {
      "lose weight": "Perdere peso",
      maintain: "Mantenere il peso",
      "build muscle": "Aumentare la massa muscolare"
    } as Record<UserPreferences["fitnessGoal"], string>
  )[value];

export const householdTypeLabel = (value: UserPreferences["householdType"]) =>
  (
    {
      single: "Single",
      couple: "Coppia",
      family: "Famiglia",
      student: "Studente"
    } as Record<UserPreferences["householdType"], string>
  )[value];

export const priorityLabel = (value: GroceryItem["priority"]) => (value === "high" ? "Priorita alta" : "Priorita normale");

export const buildNotifications = (inventory: InventoryItem[], groceryList: GroceryItem[]): NotificationItem[] => {
  const urgent = inventory.flatMap<NotificationItem>((item) => {
    const status = getInventoryStatus(item);
    if (status === "expired") {
      return [
        {
          id: `notif-expired-${item.id}`,
          type: "expired" as const,
          title: `${item.name} e' scaduto`,
          description: `Scaduto da ${Math.abs(daysUntil(item.expirationDate))} giorno/i. Valuta se sostituirlo o rimuoverlo dall'inventario.`,
          itemId: item.id
        }
      ];
    }
    if (status === "expiring") {
      return [
        {
          id: `notif-expiring-${item.id}`,
          type: "expiring" as const,
          title: `${item.name} e' in scadenza`,
          description: `Usalo entro ${Math.max(daysUntil(item.expirationDate), 0)} giorno/i per evitare sprechi.`,
          itemId: item.id
        }
      ];
    }
    if (isLowStock(item)) {
      return [
        {
          id: `notif-low-${item.id}`,
          type: "low-stock" as const,
          title: `${item.name} ha scorte basse`,
          description: `Restano solo ${item.quantity} ${item.unit}. Valuta di aggiungerlo alla lista della spesa.`,
          itemId: item.id
        }
      ];
    }
    return [];
  });

  const groceryReminder =
    groceryList.length > 0
      ? [
          {
            id: "notif-grocery",
            type: "reminder" as const,
            title: "La tua lista della spesa smart e' pronta",
            description: `${groceryList.length} articoli sono gia' pronti per il prossimo acquisto.`
          }
        ]
      : [];

  return [...urgent, ...groceryReminder];
};

export const getRecipeMatchScore = (recipe: Recipe, inventory: InventoryItem[]) => {
  const inventoryNames = new Set(inventory.map((item) => item.name.toLowerCase()));
  const matched = recipe.ingredients.filter((ingredient) => inventoryNames.has(ingredient.toLowerCase()));
  return {
    matched,
    missing: recipe.ingredients.filter((ingredient) => !inventoryNames.has(ingredient.toLowerCase())),
    ratio: matched.length / recipe.ingredients.length
  };
};

export const filterRecipes = (recipes: Recipe[], tag: RecipeTag | "all", inventory: InventoryItem[]) => {
  return recipes
    .filter((recipe) => (tag === "all" ? true : recipe.tags.includes(tag)))
    .map((recipe) => ({
      ...recipe,
      match: getRecipeMatchScore(recipe, inventory)
    }))
    .sort((a, b) => b.match.ratio - a.match.ratio);
};

export const goalLabel = (preferences: UserPreferences) =>
  `${dietPreferenceLabel(preferences.dietPreference)} per ${fitnessGoalLabel(preferences.fitnessGoal).toLowerCase()}`;
